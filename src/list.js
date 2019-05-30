import React from "react";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LikedIcon from "@material-ui/icons/Favorite";
import HighlightIcon from "@material-ui/icons/HighlightOutlined";
import HighlightedIcon from "@material-ui/icons/Highlight";
import MakeIcon from "@material-ui/icons/BrushOutlined";
import MadeIcon from "@material-ui/icons/Brush";

import axios from "axios";

const ENUM_LOADING = "LOADING";
const ENUM_COMPLETE = "COMPLETE";
const ENUM_ERROR = "ERROR";

const Header = () => (
  <Typography
    variant="h3"
    component="h3"
    gutterBottom
    color="primary"
    display="block"
  >
    Discover your next project to hack on this weekend
  </Typography>
);

const CircularLoader = ({ styles }) => (
  <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    classes={{ root: styles.isLoading }}
  >
    <CircularProgress color="secondary" />
  </Grid>
);

const IdeaCards = ({ ideas, styles }) => (
  <Grid
    container
    spacing={4}
    direction="column"
    justify="center"
    alignItems="center"
    classes={{ root: styles.gridCard }}
  >
    {ideas.map(idea => (
      <Grid
        item
        xs={12}
        sm={8}
        classes={{ "grid-xs-12": styles.ideaCardMobile }}
      >
        <Card>
          <CardHeader title={idea.name} subheader={`Submitted by Zubuhba`} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {idea.description}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="Like the idea"
              classes={{ root: styles.cardActionButtons }}
            >
              <LikeIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary" component="p" classes={{root : styles.cardActionStats}}>
              12
            </Typography>
            <IconButton aria-label="Will make the idea">
              <HighlightIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary" component="p" classes={{root : styles.cardActionStats}}>
              120
            </Typography>
            <IconButton aria-label="Made the project">
              <MadeIcon />
            </IconButton>
            <Typography variant="body2" color="textSecondary" component="p" classes={{root : styles.cardActionStats}}>
              20
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const FloatingActionButton = ({ styles }) => (
  <Fab
    disableRipple
    disableFocusRipple
    color="secondary"
    variant="extended"
    classes={{ root: styles.fab }}
  >
    <AddIcon classes={{ root: styles.addIcon }} />
    Add idea
  </Fab>
);

const styles = theme => ({
  container: {
    minHeight: "100vh",
    paddingTop: "4rem",
    paddingBottom: 2
  },
  fab: {
    margin: theme.spacing(7),
    color: theme.palette.primary.contrastText,
    position: "fixed",
    right: 0,
    bottom: 0
  },
  addIcon: {
    marginRight: theme.spacing(1)
  },
  isLoading: {
    minHeight: "50vh"
  },
  gridCard: {
    marginTop: "6rem"
  },
  ideaCardMobile: {
    width: "100%"
  },
  cardAction: {
    paddingRight : "2rem",
    paddingLeft : "2rem"
  },
  cardActionButtons: {
    marginLeft: "auto"
  },
  cardActionStats: {
    marginLeft : "-0.2rem",
    marginRight: "0.5rem"
  }
});

class List extends React.Component {
  state = {
    networkState: ENUM_LOADING,
    ideas: []
  };

  async componentDidMount() {
    try {
      const url = "http://localhost:8000/ideas";
      const request = await axios.get(url);
      const response = await request.data;
      console.log(response);
      if (response.status && response.status === 200) {
        this.setState({
          ideas: response.data,
          networkState: ENUM_COMPLETE
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { classes: styles } = this.props;
    const { ideas, networkState } = this.state;

    return (
      <Container classes={{ root: styles.container }}>
        <Header />
        {networkState === ENUM_LOADING && <CircularLoader styles={styles} />}
        {networkState === ENUM_COMPLETE && (
          <IdeaCards ideas={ideas} styles={styles} />
        )}
        <FloatingActionButton styles={styles} />
      </Container>
    );
  }
}

export default withStyles(styles)(List);
