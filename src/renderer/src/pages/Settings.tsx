import React, { useEffect } from "react";
import { useTitleStore } from "@/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Settings as SettingsIcon } from "lucide-react";
import {useTheme} from "@/components/features/ThemeProvider";

const Settings = () => {
  const setTitle = useTitleStore((state) => state.setTitle);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  return (
      <div className="max-w-2xl mx-auto p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center space-x-2 px-1">
          <SettingsIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">System Settings</h2>
        </div>

        <Card className="shadow-sm border-primary/10">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize how the application looks on your device.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-full">
                  {theme === "dark" ? (
                      <Moon className="w-5 h-5 text-blue-400" />
                  ) : (
                      <Sun className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes.
                  </p>
                </div>
              </div>
              <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked:any) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/30 border-none">
          <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Project developed by Group 5
            </p>
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              Version 1.0.0-alpha
            </p>
          </CardContent>
        </Card>
      </div>
  );
};

export default Settings;