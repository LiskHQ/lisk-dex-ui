import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { Grid, Typography } from '@mui/material';

import { MENU_ITEMS } from 'consts';
import { FooterStyle } from './index.style';

const compareUrl = (a: string, b: string) => {
  if (a.indexOf(b) === 0) return true;
  return false;
}

export const Footer: React.FC = () => {
  const router = useRouter();
  const { pathname } = router || { pathname: '' };

  return (
    <FooterStyle className="footer-container" maxWidth="xl" data-testid="footer">
      <Grid className="footer-menu" container spacing={1}>
        {
          MENU_ITEMS.map((item, index) => (
            <Link href={item.href} passHref legacyBehavior key={item.href}>
              <Grid
                key={index}
                className={cn({
                  "footer-menu-item": true,
                  "active": compareUrl(pathname, item.href),
                })}
                item
                xs={3}
              >
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            </Link>
          ))
        }
      </Grid>
    </FooterStyle>
  )
}
