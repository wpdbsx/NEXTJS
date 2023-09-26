import * as yup from "yup";

export const signUpValidation = yup.object({
  email: yup
    .string()
    .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "이메일 형식에 맞지 않습니다.")
    .required("이메일을 입력해주세요."),
  nickname: yup
    .string()
    .required("닉네임을 입력해주세요.")
    .max(15, "닉네임은 15자리 이하여야 합니다.")
    .min(2, "닉네임은 2자리 이상이어야 합니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .max(15, "비밀번호는 15자리 이하여야 합니다.")
    .min(4, "비밀번호는 4자리 이상이어야 합니다."),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
  term: yup
    .boolean()
    .required("약관에 동의해주세요.")
    .oneOf([true], "약관에 동의해주세요."),
  blog: yup.string().url("유효한 URL 형식이 아닙니다."),
});
