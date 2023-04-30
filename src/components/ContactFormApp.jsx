import axios from "axios";
import { nanoid } from "nanoid";
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";

// API endpoint
// https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries

const ContactFormApp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const post = {
      id: nanoid(),
      fullName: fullName,
      email: email,
      subject: subject,
      message: message,
    };
    try {
      const response = await axios.post(
        `https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries`,
        post
      );
      console.log(response.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <Grid>
        <Card
          style={{ maxWidth: 500, padding: "20px 5px", margin: "10px auto" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" textAlign="center">
              Contact Us
            </Typography>
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter your name"
                    label="Full Name"
                    variant="outlined"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter your email address"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Subject"
                    label="Subject"
                    variant="outlined"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
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
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="secondary">
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

export default ContactFormApp;
