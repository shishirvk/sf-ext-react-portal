import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

interface CardLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  /** Extra classes for the card, e.g. "glass-panel". */
  className?: string;
}

/**
 * Card layout component for authentication pages.
 * Provides CardHeader with title and optional description, and CardContent.
 */
export function CardLayout({ title, description, children, className }: CardLayoutProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
