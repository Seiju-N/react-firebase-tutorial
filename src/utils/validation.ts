import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import type { FieldValues } from "react-hook-form";

export const resolver = yupResolver<FieldValues>;
export default yup;
