import { IoEyeOutline } from "react-icons/io5";

const PasswordInput = ({
  onChange,
  value,
  showPassword,
  togglePasswordVisibility,
}: {
  onChange: any;
  value: string;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}) => (
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Nhập mật khẩu tại đây ..."
      className="input input-bordered w-[388px] pl-3 pr-10 placeholder:w-[334px] placeholder:h-[20px] focus:placeholder:w-[334px] 
      focus:placeholder:h-[20px]"
      onChange={onChange}
      value={value}
    />
    <div
      className="flex absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
      onClick={togglePasswordVisibility}
    >
      <IoEyeOutline className="" />
    </div>
  </div>
);

export default PasswordInput;
