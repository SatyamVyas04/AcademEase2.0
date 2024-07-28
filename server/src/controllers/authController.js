import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import config from '../config.js';

const { googleClientID, googleClientSecret } = config;

export const googleAuth = async (req, res) => {
  const { code } = req.body;

  try {
    const { data } = await axios.post(`https://oauth2.googleapis.com/token`, {
      code,
      client_id: googleClientID,
      client_secret: googleClientSecret,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code'
    });

    const { id_token, access_token } = data;

    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });
   
    const { email, name, picture } = response.data;
  
    let user = await User.findOne({ email });
  
    if (!user) {
      user = new User({ email, username: name, avatar: picture });
      await user.save();
      
    }
  
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ message: 'Google authentication failed', error });
  }
};

