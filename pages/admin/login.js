import Link from 'next/link'
import LoginForm from '../../CMS/components/LoginForm'
import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'

const SignInPage = props => (
  <>
    {/* SigninBox handles all login logic. */}
    <LoginForm />
    <hr />
    New?{' '}
    <Link prefetch href="/admin/register">
      <a>Create account</a>
    </Link>
  </>
)

SignInPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (loggedInUser) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/admin/dashboard')
  }

  return {}
}

export default SignInPage

// export default class Signin extends React.Component {
//   static async getInitialProps(context) {
//     const { loggedInUser } = await checkLoggedIn(context.apolloClient)

//     if (loggedInUser) {
//       // Already signed in? No need to continue.
//       // Throw them back to the main page
//       redirect(context, '/admin/dashboard')
//     }

//     return {}
//   }

//   render() {
//     return (
//       <>
//         {/* SigninBox handles all login logic. */}
//         <LoginForm />
//         <hr />
//         New?{' '}
//         <Link prefetch href="/admin/register">
//           <a>Create account</a>
//         </Link>
//       </>
//     )
//   }
// }
