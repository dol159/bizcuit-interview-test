import React, { useState } from 'react';
import {
  AppBar,  Box, Button, Card, CardActions, CardContent, CircularProgress, CssBaseline, IconButton, List, ListItem, 
  ListItemText, Paper, ThemeProvider, Toolbar, Typography
} from '@material-ui/core'
import { createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import './App.css';

interface Beer {
  uid: string,
  brand: string,
  name: string,
  style: string,
  hop: string,
  yeast: string,
  malts: string,
  ibu: string,
  alcohol: string,
  blg: string,
  randomCount: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    }
  })
);

function App() {
  const [lightTheme, setLightTheme] = useState(true)
  const [beerList, setBeerList] = useState<Beer[]>([])
  const [index, setIndex] = useState<number>(-1)

  const classes = useStyles()
  const appliedTheme = createMuiTheme(lightTheme ? light : dark)

  async function fetchBeer() {
    if (index === -1 || index === beerList.length - 1) {
      try {
        const res = await fetch('http://localhost:4000/beer/random')
        const json = await res.json() as Beer
        setBeerList([...beerList, json])
        setIndex(index + 1)
      } catch {

      }
    } else {
      setIndex(index + 1)
    }
  }

  const beer = beerList[index]
  console.log("lightTheme", lightTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Question 3
          </Typography>
          <IconButton
            onClick={() => setLightTheme(!lightTheme)}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit">
            {lightTheme ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box padding={2}>
        <Paper>
          <Card>
            <CardContent>
              {beerList.length === 0 || beer === undefined ? (
                <CircularProgress />
              ) : (
                <List>
                  {Object.entries(beer).map(([key, value]) => (
                    <>
                      <ListItem>
                        <ListItemText primary={key} secondary={value} />
                      </ListItem>
                    </>
                  ))}
                </List>
              )}
            </CardContent>
            <CardActions>
              <Button
                onClick={() => setIndex(index - 1)}
                variant="contained"
                disabled={index <= 0}
              >
                Previous
              </Button>
              <Button color="primary" variant="contained" onClick={() => fetchBeer()}>
                Next
              </Button>
            </CardActions>
          </Card>

        </Paper>
      </Box>

    </ThemeProvider>
  );
}

export const light: any = {
  palette: {
    type: 'light'
  },
}
export const dark: any = {
  palette: {
    type: 'dark',
  },
}

export default App;
