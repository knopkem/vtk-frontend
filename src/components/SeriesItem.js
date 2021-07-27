import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.4)',
  },
  title: {
    fontSize: 11,
  },
  pos: {
    marginBottom: 2,
  },
});

export default function SeriesItem(props) {
  const classes = useStyles();

  const handleClick = () => {
    props.onClick({ uid: props.uid, mpr: false });
  };

  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Series Description
        </Typography>
        <Typography variant="h5" component="h2">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
