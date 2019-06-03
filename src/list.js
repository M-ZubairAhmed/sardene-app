import React from "react";

import axios from "axios";

const ENUM_LOADING = "LOADING";
const ENUM_COMPLETE = "COMPLETE";
const ENUM_ERROR = "ERROR";

const Header = () => (
  <div
    variant="h3"
    component="h3"
    gutterBottom
    color="primary"
    display="block"
  >
    Discover your next project to hack on this weekend
  </div>
);

const CircularLoader = ({ styles }) => (
  <>LOADING</>
);

const IdeaCards = ({ ideas, styles }) => (
  <div
    container
    spacing={4}
    direction="column"
    justify="center"
    alignItems="center"
  >
    {ideas.map(idea => (
      <Grid
        item
        xs={12}
        sm={8}
        classes={{ "grid-xs-12": styles.ideaCardMobile }}
      >
        <div>
          <CardHeader
            title={idea.name}
            subheader={`By ${idea.publisher}`}
            action={
              <Typography variant="body2" color="textSecondary" component="p">
                {idea.created_at}
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {idea.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip
              TransitionComponent={Zoom}
              title={`Idea liked by ${idea.gazers} people`}
            >
              <IconButton
                aria-label="Like the idea"
                classes={{ root: styles.cardActionButtons }}
              >
                <LikeIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              classes={{ root: styles.cardActionStats }}
            >
              {idea.gazers}
            </Typography>
            <Tooltip
              TransitionComponent={Zoom}
              title={`Idea implemented by ${idea.makers} people`}
            >
              <IconButton aria-label="Made the project">
                <MadeIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              classes={{ root: styles.cardActionStats }}
            >
              {idea.makers}
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
    paddingRight: "2rem",
    paddingLeft: "2rem"
  },
  cardActionButtons: {
    marginLeft: "auto"
  },
  cardActionStats: {
    marginLeft: "-0.2rem",
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
          ideas: response.data.sort((a, b) => b.created_at - a.created_at),
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
