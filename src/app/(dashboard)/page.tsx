import * as React from 'react';
import Typography from '@mui/material/Typography';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '../../auth';

export default async function HomePage() {
  const session = await auth();
  const currentUrl = headers().get('referer') || 'http://localhost:3000';
  console.log("node_env", process.env.NODE_ENV, currentUrl, headers().get('referer'))
  if (!session) {
    console.log("node_env", process.env.NODE_ENV, currentUrl, headers().get('referer'))
    // Get the current URL to redirect to signIn with `callbackUrl`
    const redirectUrl = new URL('/auth/signin', currentUrl);
    redirectUrl.searchParams.set('callbackUrl', currentUrl);

    redirect(redirectUrl.toString());
  }
  return (
    <Typography>
      Welcome to Toolpad, {session?.user?.name || session?.user?.email || 'User'}!
    </Typography>
  );
}
