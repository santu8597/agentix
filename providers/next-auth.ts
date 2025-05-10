import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: 'read:user' } }, // 'repo' scope to read private repos too
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar",
          access_type: "offline",
          prompt: "consent",
        },
      },// basic profile scopes
    }),
  TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      authorization: { params: { scope: 'tweet.read tweet.write' } },
   }) // 'tweet.read tweet.write' for read/write access 
  ],
  
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        
       token.accessToken = account.access_token
  token.refreshToken = account.refresh_token
  
   // or account.email if available
      }
      return token
    },
    async session({ session, token }) {
     session.accessToken = token.accessToken
session.refreshToken = token.refreshToken

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}