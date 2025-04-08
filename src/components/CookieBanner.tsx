"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "./ui/switch";

type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } catch {
        if (saved === "accepted") {
          setPreferences({ analytics: true, marketing: true });
        }
      }
    } else {
      setVisible(true);
    }
  }, []);

  const savePreferences = (prefs: ConsentPreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setPreferencesOpen(false);
    setVisible(false);
  };

  const handleAccept = () => {
    savePreferences({ analytics: true, marketing: true });
  };

  const handleReject = () => {
    savePreferences({ analytics: false, marketing: false });
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 w-full z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-6 py-4 border-t border-gray-300 dark:border-gray-700 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm">
          We use cookies to personalize content and analyse traffic. Manage
          preferences or accept to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button onClick={handleAccept}>Accept</Button>
          <Button variant="outline" onClick={handleReject}>
            Reject
          </Button>
          <Button variant="ghost" onClick={() => setPreferencesOpen(true)}>
            Manage Preferences
          </Button>
        </div>
      </div>

      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <div>
              <strong>Essential Cookies</strong> – Always enabled
            </div>

            <div className="flex items-center justify-between">
              <div>
                <strong>Analytics</strong>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Helps us improve the app
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(val) =>
                  setPreferences((prev) => ({ ...prev, analytics: val }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <strong>Marketing</strong>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Personalised ads and tracking
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(val) =>
                  setPreferences((prev) => ({ ...prev, marketing: val }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPreferencesOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => savePreferences(preferences)}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
