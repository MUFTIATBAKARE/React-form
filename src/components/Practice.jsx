import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const Practice = () => {
  return (
    <div>
      <Grid>
        <Card
          style={{
            maxWidth: 500,
            padding: "20px 5px",
            margin: "10px auto",
            background: "url",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4">
              Contact Us
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter your name"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter your email address"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Subject"
                    label="Subject"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Write your message"
                    label="Message"
                    multiline
                    rows={7}
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={7} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Practice;
