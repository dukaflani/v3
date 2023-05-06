// Next Imports
import { useRouter } from 'next/router';
import Head from "next/head"

// MUI Imports
import { Box, Card, CardContent, Container, Link, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'

// Project imports
import Copyright from '@/components/reusableComponents/Copyright';
import MobileNavigationLayout from '@/layout/mobile/MobileNavigationLayout'




const TermsAndConditions = ({ setIsDarkMode, isDarkMode, value, setValue }) => {
    const router = useRouter()
    const theme = useTheme()


  return (
    <>
    <MobileNavigationLayout setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} value={value} setValue={setValue} >
    <Head>
        <title>Terms & Conditions — Dukaflani</title>
        <meta name="title" content="Terms & Conditions — Dukaflani"/>
        <meta name="description" content="Read Our Terms & Conditions"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums, Celebrity Merchandise, Name Brands"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/legal/terms_and_conditions`} />
        <meta property="og:title" content="Terms & Conditions — Dukaflani"/>
        <meta property="og:description" content="Read Our Terms & Conditions"/>
        <meta property="og:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/legal/terms_and_conditions`} />
        <meta property="twitter:title" content="Terms & Conditions — Dukaflani"/>
        <meta property="twitter:description" content="Read Our Terms & Conditions"/>
        <meta property="twitter:image" content="https://dukaflani-user-uploads.s3.ap-south-1.amazonaws.com/branding/dukaflani-social-media-cover-potrait.png"/>
      </Head>
    <Box sx={{minHeight: '100vh', backgroundColor: theme.myColors.myBackground}}>
        <Container maxWidth="md">
        <Stack sx={{minHeight: '100vh', paddingTop: 10 }} spacing={3}>
                <Box >
                    <Card square>
                        <CardContent>
                            <Stack spacing={2}>
                                <Typography variant='h6'>Terms and conditions</Typography>
                                <Typography variant='subtitle2'>
                                    1. Introduction
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography variant='body1'>
                                            1.1 &ldquo;Dukaflani&ldquo; is the trading name of dukaflani.com which operates an e-commerce website (&ldquo;marketplace&ldquo;),
                                            for the sale and purchase of consumer products and services.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            1.2 These general terms and conditions shall apply to buyers and sellers on the marketplace and shall govern your use of the marketplace and related services.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            1.3 By using our marketplace, you accept these general terms and conditions in full. If you disagree with these general terms and conditions or any part of 
                                            these general terms and conditions, you must not use our marketplace.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            1.4 If you use our marketplace in the course of a business or other organizational project, then by so doing you:
                                        </Typography>
                                        <ul>
                                            <li>
                                                <Typography variant='body2'>
                                                    1.4.1 confirm that you have obtained the necessary authority to agree to these general terms and conditions;
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant='body2'>
                                                    1.4.2 bind both yourself and the person, company or other legal entity that operates that business or organizational project, to 
                                                    these general terms and conditions; and
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant='body2'>
                                                    1.4.3 agree that &ldquo;you&ldquo; in these general terms and conditions shall reference both the individual user and the relevant person, 
                                                    company or legal entity unless the context requires otherwise.
                                                </Typography>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <Typography variant='subtitle2'>
                                    2. Registration and account
                                </Typography>
                                <ul>
                                    <li>
                                        <Typography variant='body1'>
                                            2.1 You may not register with our marketplace if you are under 18 years of age (by using our marketplace or agreeing to these general terms and conditions, you warrant and represent to us that you are at least 18 years of age).
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            2.2 If you register for an account with our marketplace, you will be asked to provide an email address/username and password and you agree to:
                                        </Typography>
                                        <ul>
                                            <li>
                                                <Typography variant='body2'>
                                                    2.2.1 keep your password confidential;
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant='body2'>
                                                    2.2.2 notify us in writing immediately (using our contact details) if you become aware of any disclosure of your password; and
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography variant='body2'>
                                                    2.2.3 be responsible for any activity on our marketplace arising out of any failure to keep your password confidential, and you acknowledge that you may be held liable for any losses arising out of such a failure.
                                                </Typography>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            2.3 Your account shall be used exclusively by you and you shall not transfer your account to any third party. If you authorize any third party to manage your account on your behalf this shall be at your own risk.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            2.4 We may suspend or cancel your account, and/or edit your account details, at any time in our sole discretion and without notice or explanation, providing that if we cancel any products or services you have paid for but not received, and you have not breached these general terms and conditions, we will refund you in respect of the same.
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                        2.5 You may cancel your account on our marketplace by contacting us.
                                        </Typography>
                                    </li>
                                </ul>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Copyright/>
                </Box>
        </Stack>
        </Container>
    </Box>
    </MobileNavigationLayout>
</>
  )
}

export default TermsAndConditions