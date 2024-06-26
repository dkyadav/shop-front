// import { useSelector, useDispatch } from "react-redux"
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://dkyadavlab.com/">
                myshop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Home() {

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Home for my shop!!
                </Typography>
                
                <Copyright />
            </Box>
        </Container>
    )
};