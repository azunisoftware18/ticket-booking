import AuthService from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cookieOptions } from "../utils/jwt.js";

class AuthController {
  static login = async (req, res) => {
    const data = await AuthService.login(req.body);

    const { accessToken, refreshToken } = data;

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json(ApiResponse.success(data, "Login successful", 200));
  };

  static getMe = async (req, res) => {
    const data = await AuthService.getCurrentUser(req.user.id);

    return res
      .status(200)
      .json(ApiResponse.success(data, "User fetched successfully", 200));
  };

  static refresh = async (req, res) => {
    const { refreshToken } = req.body;

    const data = await AuthService.refreshToken(refreshToken);

    return res.status(200).json(ApiResponse.success(data, "Token refreshed"));
  };

  static logout = async (req, res) => {
    await AuthService.logout(req.user.id);

    return res
      .status(200)
      .json(ApiResponse.success(null, "Logged out successfully"));
  };
}

export default AuthController;
