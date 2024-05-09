import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";
import dotenv from "dotenv";
import User from "./models/UserModel.js";
dotenv.config();
import bcrypt from "bcryptjs";
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
        let user = await User.findOne({ email: profile.id });

        // Nếu người dùng chưa tồn tại, tạo người dùng mới
        if (!user) {
          // Tạo mật khẩu ngẫu nhiên
          const randomPassword = Math.random().toString(36).slice(-8);

          // Mã hóa mật khẩu
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          user = new User({
            name: profile.displayName,
            email: profile.id,
            password: hashedPassword, // Lưu mật khẩu đã mã hóa vào cơ sở dữ liệu
            picture: profile.photos[0].value, // Ảnh đại diện từ Google
            // Các trường khác có thể thêm vào tại đây
          });
          await user.save(); // Lưu người dùng mới vào cơ sở dữ liệu
        }

        // Trả về thông tin người dùng
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu hay chưa
        let user = await User.findOne({ email: profile.id });

        // Nếu người dùng chưa tồn tại, tạo người dùng mới
        if (!user) {
          // Tạo mật khẩu ngẫu nhiên
          const randomPassword = Math.random().toString(36).slice(-8);

          // Mã hóa mật khẩu
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          user = new User({
            name: profile.displayName,
            email: profile.id,
            password: hashedPassword, // Lưu mật khẩu đã mã hóa vào cơ sở dữ liệu
            picture: profile.photos[0].value, // Ảnh đại diện từ Google
            // Các trường khác có thể thêm vào tại đây
          });
          await user.save(); // Lưu người dùng mới vào cơ sở dữ liệu
        }

        // Trả về thông tin người dùng
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
