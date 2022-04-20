import LocalizedStrings from 'react-localization';
import {
    EMAIL_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH
} from "../constants";

export const localizedStrings = new LocalizedStrings({

        en: {
            logout: "Logout",
            login: "Login",
            signUp: "Sign up",
            loginFormRegisterNow: " register now!",
            alreadyRegister: "Already registered?",
            signUpFromLoginNow: "SignIn now!",
            or: "or",
            email: "email",
            password: "Password",
            loginField: "Login",


            confPassword: "Confirmed password",

            alertBadEmail: "Please input your email!",
            alertBadPassword: "Please input your Password!",
            alertSuccessRegister: "Thank you! You're successfully registered. Please SignIn to continue!",

            alertException: "Sorry! Something went wrong. Please try again!",


            alertEmailNotValid: 'Email is not valid!',
            alertEmailToLong: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`,
            alertEmailAlreadyInUser: 'This Email is already registered',
            alertPasswordTooShort: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`,
            alertPasswordTooLong: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`,
            alertConfPass: 'Confirmed pass do not match with pass',

            alertEmptyEmail: 'Email may not be empty',

            alertAppName: 'Spring boot multimodule app',
            alertLoggedOut: 'You have been logged out. Please login create certificate.',


            alertWrongEmailOrPassword: 'Your Username or Password is incorrect. Please try again!',
            alertSuccessLogin: 'You are successfully logged in!',

            alertNoPermission: 'No permissions,Sorry!',
            alertSuccessLogOut: 'You are successfully logged out!',

            alertPageNotFound: " The Page you're looking for was not found. ",
            alertPageNoPermission: " You have no permission. Sorry!",

            helpForPass: "A password between 6 to 20 characters",
            helpForEmail: "Your email",
        }
    })
;
