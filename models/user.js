// @ts-nocheck
const mongoose = require("mongoose");
const Token = require("./token");
const { AuthenticationError, UserInputError } = require("apollo-server");

const crypto = require("crypto");

const {
  bcryptCompare,
  bcryptHash,
  decoded,
  handleError,
  sendMail,
  sign,
  verifyToken,
} = require("../helpers/index");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "BISEXUAL"],
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    id: false,
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

User.createUser = async ({
  email,
  fullName,
  username,
  gender,
  age,
  password,
  confirmPassword,
}) => {
  try {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (!regex.test(email)) {
      throw new UserInputError("Invalid email address");
    }
    const userByEmail = await User.findOne({ email: email });
    if (userByEmail) {
      throw new AuthenticationError(
        "User already registered with the email address"
      );
    }
    const userByUsername = await User.findOne({ username: username });
    if (userByUsername) {
      throw new AuthenticationError(
        "User already registered with the username"
      );
    }
    if (password.length < 6) {
      throw new UserInputError("Password must be more than 6 letters");
    }
    if (confirmPassword !== password) {
      throw new UserInputError("Password Mismatch");
    }
    const hashPassword = await bcryptHash(password);
    const user = new User({
      email,
      fullName,
      username,
      age,
      gender,
      password: hashPassword,
    });
    const config = {
      to: email,
      subject: "Registration Successful",
      html: `<h1 style="font-size: 28px">Successful Registration</h1>
      <p style="font-size: 12px; color: grey">Proceed to verify your email account by clicking on the link in the next mail that will forwarded to you soon</p>`,
    };
    const code = ("" + Math.random()).substring(2, 10);
    const token = new Token({
      token: code,
      userId: user._id,
    });

    const emailConfig = {
      to: email,
      subject: "Email Confirmation",
      html: `<p>Your code is</p>
      <p style="width: 50%; margin: auto; font-size: 30px; letter-spacing: 3px">${code}</p>
     `,
    };
    console.log(await sendMail(config));
    console.log(await sendMail(emailConfig));
    await token.save();
    await user.save();
    return {
      message: "Created Successfully",
      status: 200,
      user,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

User.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("No user registered with email address");
    }
    const doMatch = await bcryptCompare(password, user.password);
    if (!doMatch) {
      throw new Error("Incorrect Password");
    }
    if (!user.verified) {
      throw new Error ("Pls confirm your email address sent to your email address")
    }
    const payload = {
      email: user.email,
      username: user.username,
      userId: user._id,
    };
    const token = await sign(payload);
    return {
      token,
      message: "Logged In Successsfully",
      success: true,
    };
  } catch (error) {
    handleError(error);
  }
};

User.getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

User.verifyEmail = async (code) => {
  try {
    const token = await Token.findOne({ token: code });
    if (!token) {
      throw new Error("Invalid token");
    }
    const user = await User.findOne({ _id: token.userId });
    if (user.verified) {
      throw new Error("User already verified, kindly proceed to login");
    }
    user.verified = true;
    await user.save();
    await Token.deleteOne({ token: code });
    return {
      message: "Email verified",
      success: true,
      code: 200
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

User.verifyToken = async (req) => {
  const { token } = req.headers;
  if (token) {
    try {
      const signatory = await verifyToken(token);
      if (signatory) {
        const payload = await decoded(token);
        if (payload.exp > Date.now()) {
          throw new Error("Token already expired");
        }
        return payload;
      } else {
        throw new Error("Cannot Verify Token");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } else {
    return {
      payload: false,
    };
  }
};

module.exports = User;
