import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLBuilder } from 'fast-xml-parser';
import { parseNetworkDocument, NetworkXmlError } from './org-setup-xml.mjs';
import { escapeSoqlString } from './org-setup-utils.mjs';

const builder = new XMLBuilder({
  ignoreAttributes: false,
  commentPropName: '#comment',
  format: true,
  indentBy: '    ',
  suppressEmptyNode: true,
});

export function preserveNetworkSenders(projectDir, targetOrg, run = execFileSync) {
  const project = JSON.parse(readFileSync(join(projectDir, 'sfdx-project.json'), 'utf8'));
  const files = (project.packageDirectories ?? []).flatMap(({ path }) => {
    const dir = join(projectDir, path, 'main/default/networks');
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter((name) => name.endsWith('.network-meta.xml'))
      .map((name) => ({ name: name.slice(0, -'.network-meta.xml'.length), path: join(dir, name) }));
  });
  if (!files.length) return;

  const names = [...new Set(files.map(({ name }) => `'${escapeSoqlString(name)}'`))];
  const response = JSON.parse(run('sf', [
    'data', 'query', '--target-org', targetOrg,
    '--query', `SELECT Name, EmailSenderAddress FROM Network WHERE Name IN (${names.join(',')})`,
    '--json',
  ], { cwd: projectDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000 }));
  if (response.status !== 0 || !Array.isArray(response.result?.records) || !response.result.done) {
    throw new Error('Could not read all target Network sender addresses; deployment stopped.');
  }
  const senders = new Map(response.result.records.map((record) => [record.Name, record.EmailSenderAddress]));

  const updates = files.map((file) => {
    const original = readFileSync(file.path, 'utf8');
    const document = parseNetworkDocument(original);
    const network = document.Network;
    let changed = false;
    if (senders.has(file.name)) {
      const sender = senders.get(file.name);
      if (typeof sender !== 'string' || !sender.trim()) {
        throw new Error(`The target Network "${file.name}" has no sender address; deployment stopped.`);
      }
      if (typeof network.emailSenderAddress !== 'string') {
        throw new NetworkXmlError(`Expected one emailSenderAddress in ${file.name}.network-meta.xml`);
      }
      if (network.emailSenderAddress !== sender) {
        network.emailSenderAddress = sender;
        changed = true;
      }
    }
    // Sender changes belong to the site's Administration workspace.
    if ('newSenderAddress' in network) {
      delete network.newSenderAddress;
      changed = true;
    }
    return { ...file, xml: changed ? builder.build(document) : original, changed };
  });

  for (const file of updates) {
    if (file.changed) writeFileSync(file.path, file.xml);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== '--target-org' || !args[1].trim()) {
    console.error('Usage: node scripts/network-senders.mjs --target-org <alias>');
    process.exitCode = 1;
  } else {
    try {
      preserveNetworkSenders(resolve(dirname(fileURLToPath(import.meta.url)), '..'), args[1]);
      console.log('Network metadata prepared with the target org sender addresses.');
    } catch (error) {
      console.error(`Network metadata preparation failed: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
