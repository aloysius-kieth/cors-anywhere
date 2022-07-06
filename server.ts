import express, { Express, Request, response, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();

const SETTINGS = {
  url: process.env.API_URL || "",
  port: process.env.PORT || 3000,
  email: process.env.email || "",
  password: process.env.password || "",
};

const app: Express = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

let authToken = "";
var email: string = SETTINGS.email;
var password: string = SETTINGS.password;

const API_URL = SETTINGS.url;
const LOGIN_ENDPOINT = "login";
const GET_LEADERBOARD_ENDPOINT = "weeklyleaderboard";
const GAME_RESULT_ENDPOINT = "gamescore";

const login = async (
  email: string,
  password: string
): Promise<any | undefined> => {
  try {
    const { data } = await axios.post(
      `${API_URL}/${LOGIN_ENDPOINT}`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //console.log(data);
    authToken = data.data.authorizationToken;
    // console.log(authToken);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return (
        error.code?.toString()! + " | " + error.response?.statusText.toString()!
      );
    } else {
      console.log(error);
      return typeof error === "string" ? error : undefined;
    }
  }
};

const getLeaderboard = async (
  authToken: string
): Promise<string | undefined> => {
  try {
    const { data } = await axios.get(`${API_URL}/${GET_LEADERBOARD_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    //console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return (
        error.code?.toString()! + " | " + error.response?.statusText.toString()!
      );
    } else {
      console.log(error);
      return typeof error === "string" ? error : undefined;
    }
  }
};

const sendGameResult = async (
  _score: string,
  _name: string
): Promise<string | undefined> => {
  try {
    const { data } = await axios.post(
      `${API_URL}/${GAME_RESULT_ENDPOINT}`,
      {
        score: _score,
        name: _name,
      },
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    //console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return (
        error.code?.toString()! + " | " + error.response?.statusText.toString()!
      );
    } else {
      console.log(error);
      return typeof error === "string" ? error : undefined;
    }
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("Proxy Express Server to bypass CORS Origin...");
});

app.get("/login", (req: Request, res: Response) => {
  const r = login(email, password).then((response) => {
    //console.log(response);
    let data = JSON.stringify(response);
    res.send(data);
  });
});

app.get("/getLeaderboard", (req: Request, res: Response) => {
  const r = getLeaderboard(authToken).then((response) => {
    console.log(response);
    let data = JSON.stringify(response);
    res.send(data);
  });
});

app.post("/sendGameResult", (req: Request, res: Response) => {
  const r = sendGameResult(req.body.score, req.body.name).then((response) => {
    console.log(response);
    let data = JSON.stringify(response);
    res.send(data);
  });
});

const PORT = SETTINGS.port || 5000;
app.listen(PORT, () => {
  console.log(
    `⚡️[Proxy Server]: Server is running at http://localhost:${PORT}`
  );
});
