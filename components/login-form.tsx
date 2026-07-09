"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      // Navigation is handled in the useAuth hook
    } catch (error) {
      // Error is handled in the useAuth hook and displayed via the error state
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="email"
        >
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            className={cn(
              "w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground text-sm outline-none transition-all",
              "focus:ring-2 focus:ring-primary/30 focus:border-primary",
              errors.email
                ? "border-destructive focus:ring-destructive/20"
                : "border-border",
            )}
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          className="text-sm font-medium text-foreground"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password")}
            className={cn(
              "w-full pl-10 pr-11 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground text-sm outline-none transition-all",
              "focus:ring-2 focus:ring-primary/30 focus:border-primary",
              errors.password
                ? "border-destructive focus:ring-destructive/20"
                : "border-border",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border accent-primary"
          />
          Remember me
        </label>
        <a
          href="#"
          className="text-sm text-primary hover:underline font-medium"
        >
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm",
          "bg-primary text-primary-foreground",
          "hover:opacity-90 active:scale-[0.98] transition-all duration-200",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          "shadow-lg shadow-primary/25",
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            Sign in to Dashboard
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
