"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface TermsConditionsModalProps {
  isOpen: boolean;
  userName: string;
  onAgree: () => Promise<void>;
  onExit: () => void;
  isViewOnly?: boolean;
}

export function TermsConditionsModal({
  isOpen,
  userName,
  onAgree,
  onExit,
  isViewOnly = false,
}: TermsConditionsModalProps) {
  const [loading, setLoading] = useState(false);

  const handleAgree = async () => {
    setLoading(true);
    try {
      await onAgree();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && isViewOnly) {
          onExit();
        }
      }}
    >
      <DialogContent
        className="
    w-[95vw]
    sm:max-w-2xl
    md:max-w-3xl
    lg:max-w-4xl
    xl:max-w-5xl
    max-h-[90vh]
    overflow-y-auto
  "
        onInteractOutside={(e) => {
          if (!isViewOnly) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">
            User Data Privacy & Security Disclaimer
          </DialogTitle>
          <DialogDescription className="sr-only">
            Terms and conditions for data privacy and security
          </DialogDescription>
        </DialogHeader>

        <div className="bg-white p-6 overflow-auto max-h-[400px] text-gray-800 space-y-4">
          <p>
            {userName}, as a registered user of this system (including{" "}
            <strong>Admins, and Super-Admins</strong>
            ), you are entrusted with handling sensitive personal data of
            applicants and other system users. In line with the{" "}
            <strong>Data Protection Act, 2019</strong> and other applicable
            regulations, you are required to observe the highest standards of
            confidentiality, integrity, and accountability when managing this
            data.
          </p>

          <p className="font-semibold">
            By accessing and using this system, you agree to the following:
          </p>

          <ol className="list-decimal list-inside space-y-3">
            <li>
              <span className="font-semibold">Responsibility for Data</span>
              <ul className="list-disc list-inside ml-5 text-gray-700 mt-1">
                <li>
                  You are fully responsible for the accuracy, security, and
                  lawful use of any data you access, manage, or submit under
                  your account.
                </li>
                <li>
                  Any misuse, unauthorized disclosure, or negligence in handling
                  personal data will be attributed to your account.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">
                Confidentiality of Credentials
              </span>
              <ul className="list-disc list-inside ml-5 text-gray-700 mt-1">
                <li>
                  Your login credentials are strictly personal and must not be
                  shared with anyone.
                </li>
                <li>
                  Any activity carried out under your credentials will be
                  assumed to have been performed by you.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">
                System Access from Public Devices
              </span>
              <ul className="list-disc list-inside ml-5 text-gray-700 mt-1">
                <li>
                  If using a public or shared computer, always log out
                  immediately after use.
                </li>
                <li>
                  Do not save your login credentials or allow browsers to
                  remember passwords on such devices.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">
                Compliance with Data Privacy Laws
              </span>
              <ul className="list-disc list-inside ml-5 text-gray-700 mt-1">
                <li>
                  You are required to handle all personal data in compliance
                  with the <strong>Data Protection Act, 2019</strong>, including
                  principles of lawfulness, fairness, purpose limitation, data
                  minimization, accuracy, storage limitation, integrity, and
                  accountability.
                </li>
                <li>
                  Unauthorized access, alteration, transfer, or sharing of
                  personal data is strictly prohibited and may result in legal
                  and administrative consequences.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Reporting Obligations</span>
              <ul className="list-disc list-inside ml-5 text-gray-700 mt-1">
                <li>
                  In the event of any suspected data breach, misuse, or
                  unauthorized access, you must immediately report the incident
                  to the system administrators for timely investigation and
                  mitigation.
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <p className="font-medium text-sm text-gray-700">
            {isViewOnly
              ? "Review the terms and conditions for using this platform."
              : "By continuing to use this platform, you acknowledge and accept these responsibilities. After agreeing, you will be logged out and required to log back in to refresh your session."}
          </p>

          <div className="flex flex-row gap-3">
            {isViewOnly ? (
              <Button
                onClick={onExit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Close
              </Button>
            ) : (
              <>
                <Button
                  disabled={loading}
                  onClick={handleAgree}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Agree to Terms"
                  )}
                </Button>

                <Button
                  disabled={loading}
                  onClick={onExit}
                  variant="destructive"
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600"
                >
                  Exit
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
