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
const INITIAL_STATE = {
  fullName: " ",
  email: " ",
  subject: " ",
  message: " ",
};

const VALIDATION = {
  email: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: "❌Invalid email address⚠️!",
    },
  ],
  fullName: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
    {
      isValid: (value) => value.length > 10,
      message: "❌Please, enter your full name⚠️!",
    },
  ],
  subject: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
    {
      isValid: (value) => value.length > 8,
      message: "❌Space cannot be empty⚠️!",
    },
  ],
  message: [
    {
      isValid: (value) => !!value,
      message: "Is required.",
    },
    {
      isValid: (value) => value.length > 20,
      message: "❌Insufficient entry⚠️!",
    },
  ],
};
const getErrorFields = (data) =>
  Object.keys(data).reduce((acc, key) => {
    if (!VALIDATION[key]) return acc;

    const errorsPerField = VALIDATION[key]
      // get a list of potential errors for each field
      // by running through all the checks
      .map((validation) => ({
        isValid: validation.isValid(data[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

const ContactFormApp = () => {
  const [data, setData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.name);
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const errorFields = getErrorFields(data);
  console.log(errorFields);

  const onSubmit = async (event) => {
    event.preventDefault();
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;

    const post = {
      id: nanoid(),
      fullName: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        `https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries`,
        post
      );
      console.log(response.data);
      setTimeout(() => {
        setLoading(false);
        setData(INITIAL_STATE);
      }, 3000);
      setTimeout(() => {
        alert("Message sent");
      }, 3100);
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
          {loading && <div className="loader"></div>}
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
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errorFields.fullName?.length ? (
                    <span style={{ color: "red" }}>
                      {errorFields.fullName[0].message}
                    </span>
                  ) : null}
                </Grid>

                <Grid xs={12} item>
                  <TextField
                    placeholder="Enter your email address"
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errorFields.email?.length ? (
                    <span style={{ color: "red" }}>
                      {errorFields.email[0].message}
                    </span>
                  ) : null}
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Subject"
                    label="Subject"
                    variant="outlined"
                    name="subject"
                    value={data.subject}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                  />
                  {errorFields.subject?.length ? (
                    <span style={{ color: "red" }}>
                      {errorFields.subject[0].message}
                    </span>
                  ) : null}
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    placeholder="Write your message"
                    label="Message"
                    multiline
                    rows={7}
                    variant="outlined"
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    fullWidth
                  />
                  {errorFields.message?.length ? (
                    <span style={{ color: "red" }}>
                      {errorFields.message[0].message}
                    </span>
                  ) : null}
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
