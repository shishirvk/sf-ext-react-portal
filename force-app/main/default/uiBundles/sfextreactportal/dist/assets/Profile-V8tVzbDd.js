import{E as j,l as b,r as n,j as e,i as f,S as E}from"./index-Dc-su4EE.js";import{f as F,u as L,C as N,A as U,o as A,s as c,F as v,c as T}from"./helpers-Dq2c_ts5.js";import{e as w}from"./authHelpers-CYLwCLNL.js";import"./label-D9IU2Xmk.js";import"./circle-alert-Cev94XUv.js";import"./input-CQc5FIv_.js";import"./card-BcvTI2MS.js";const g=`
    Id
    FirstName @optional { value }
    LastName @optional { value }
    Email @optional { value }
    Phone @optional { value }
    Street @optional { value }
    City @optional { value }
    State @optional { value }
    PostalCode @optional { value }
    Country @optional { value }`;function I(l){return`
    query GetUserProfile($userId: ID) {
        uiapi {
            query {
                User(where: { Id: { eq: $userId } }) {
                    edges {
                        node {${l}}
                    }
                }
            }
        }
    }`}function q(l){return`
    mutation UpdateUserProfile($input: UserUpdateInput!) {
      uiapi {
        UserUpdate(input: $input) {
          Record {${l}}
        }
      }
    }`}function C(l){if(l?.length)throw console.error("GraphQL request failed",l),new Error("An unexpected error occurred")}async function R(l,i=g){const o=await(await j()).graphql.query({query:I(i),variables:{userId:l}});return C(o.errors),F(o.data?.uiapi?.query?.User?.edges?.[0]?.node)}async function $(l,i){const o=await(await j()).graphql.mutate({mutation:q(g),variables:{input:{Id:l,User:{...i}}}});return C(o.errors),F(o.data?.uiapi?.UserUpdate?.Record)}const d=c().trim().transform(l=>l===""?null:l).nullable().optional(),m=A({FirstName:c().trim().min(1,"First name is required"),LastName:c().trim().min(1,"Last name is required"),Email:w,Phone:d,Street:d,City:d,State:d,PostalCode:d,Country:d});function r({label:l}){return e.jsxs(v,{children:[e.jsx(T,{children:l}),e.jsx(E,{className:"h-9 w-full rounded-md"})]})}function k(){return e.jsxs("div",{role:"status","aria-live":"polite",children:[e.jsx("span",{className:"sr-only",children:"Loading profile…"}),e.jsx(r,{label:"Email"}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 items-start",children:[e.jsx(r,{label:"First name"}),e.jsx(r,{label:"Last name"})]}),e.jsx(r,{label:"Phone"}),e.jsx(r,{label:"Street"}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 items-start",children:[e.jsx(r,{label:"City"}),e.jsx(r,{label:"State"})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 items-start",children:[e.jsx(r,{label:"Postal Code"}),e.jsx(r,{label:"Country"})]})]})}function W(){const l=b(),[i,u]=n.useState(null),[o,S]=n.useState(null),[y,p]=n.useState(!1),[P,x]=n.useState(null),s=L({defaultValues:{},validators:{onChange:m,onSubmit:m},onSubmit:async({value:t})=>{x(null),p(!1);try{const a=await $(l.id,t);u({FirstName:a.FirstName??t.FirstName??"",LastName:a.LastName??t.LastName??"",Email:a.Email??t.Email??"",Phone:a.Phone??t.Phone??null,Street:a.Street??t.Street??null,City:a.City??t.City??null,State:a.State??t.State??null,PostalCode:a.PostalCode??t.PostalCode??null,Country:a.Country??t.Country??null}),p(!0),window.scrollTo({top:0,behavior:"smooth"})}catch(a){console.error("Failed to update profile",a),x("Failed to update profile")}},onSubmitInvalid:()=>{}});n.useEffect(()=>{let t=!0;return R(l.id).then(a=>{t&&u({FirstName:a.FirstName??"",LastName:a.LastName??"",Email:a.Email??"",Phone:a.Phone??null,Street:a.Street??null,City:a.City??null,State:a.State??null,PostalCode:a.PostalCode??null,Country:a.Country??null})}).catch(a=>{console.error("Failed to load profile",a),t&&S("Failed to load profile")}),()=>{t=!1}},[l.id]),n.useEffect(()=>{if(i){const t=m.parse(i);s.reset(t)}},[i,s]);const h=!i&&!o;return e.jsx(N,{contentMaxWidth:"md",title:f.PROFILE.TITLE,children:e.jsx(s.AppForm,{children:e.jsx(U,{title:"Profile",description:"Update your account information",showAlreadyLoggedIn:!1,error:o??P,success:y&&"Profile updated!",submit:{text:"Save Changes",loadingText:"Saving…",disabled:h},footer:{link:f.CHANGE_PASSWORD.PATH,linkText:"Change password"},children:h?e.jsx(k,{}):e.jsxs(e.Fragment,{children:[e.jsx(s.AppField,{name:"Email",children:t=>e.jsx(t.EmailField,{label:"Email",disabled:!0})}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 items-start",children:[e.jsx(s.AppField,{name:"FirstName",children:t=>e.jsx(t.TextField,{label:"First name",autoComplete:"given-name"})}),e.jsx(s.AppField,{name:"LastName",children:t=>e.jsx(t.TextField,{label:"Last name",autoComplete:"family-name"})})]}),e.jsx(s.AppField,{name:"Phone",children:t=>e.jsx(t.TextField,{label:"Phone",type:"tel",autoComplete:"tel"})}),e.jsx(s.AppField,{name:"Street",children:t=>e.jsx(t.TextField,{label:"Street",autoComplete:"street-address"})}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 items-start",children:[e.jsx(s.AppField,{name:"City",children:t=>e.jsx(t.TextField,{label:"City",autoComplete:"address-level2"})}),e.jsx(s.AppField,{name:"State",children:t=>e.jsx(t.TextField,{label:"State",autoComplete:"address-level1"})})]}),e.jsxs("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2 items-start",children:[e.jsx(s.AppField,{name:"PostalCode",children:t=>e.jsx(t.TextField,{label:"Postal Code",autoComplete:"postal-code"})}),e.jsx(s.AppField,{name:"Country",children:t=>e.jsx(t.TextField,{label:"Country",autoComplete:"country-name"})})]})]})})})})}export{W as default};
