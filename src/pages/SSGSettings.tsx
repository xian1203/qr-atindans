import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppearanceSettings } from "@/components/AppearanceSettings";
import {
  Settings,
  Bell,
  Lock,
  Users,
  Eye,
  Palette,
  Globe,
  Database,
  LogOut,
  MoreVertical,
  ChevronRight,
  Copy,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: string;
}

interface PrivacySetting {
  id: string;
  label: string;
  description: string;
  value: string;
}

const SSGSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: "1",
      title: "Event Notifications",
      description: "Receive notifications about event updates and reminders",
      enabled: true,
      category: "Events",
    },
    {
      id: "2",
      title: "Attendance Alerts",
      description: "Get alerts when attendance is low or requires attention",
      enabled: true,
      category: "Attendance",
    },
    {
      id: "3",
      title: "Budget Warnings",
      description: "Receive warnings when budget is running low",
      enabled: true,
      category: "Budget",
    },
    {
      id: "4",
      title: "Member Updates",
      description: "Notifications about new members and member activity",
      enabled: false,
      category: "Members",
    },
    {
      id: "5",
      title: "Weekly Reports",
      description: "Get weekly performance and activity reports",
      enabled: true,
      category: "Reports",
    },
    {
      id: "6",
      title: "Email Notifications",
      description: "Receive important updates via email",
      enabled: true,
      category: "Email",
    },
  ]);

  const [privacySettings, setPrivacySettings] = useState<PrivacySetting[]>([
    {
      id: "1",
      label: "Profile Visibility",
      description: "Control who can see your profile",
      value: "everyone",
    },
    {
      id: "2",
      label: "Activity Status",
      description: "Show your online status to others",
      value: "friends",
    },
    {
      id: "3",
      label: "Event Creation",
      description: "Allow others to see events you create",
      value: "everyone",
    },
  ]);

  const [userData, setUserData] = useState({
    email: "ssgpresident@college.edu",
    phone: "+63 900 123 4567",
    department: "Supreme Student Government",
  });

  const toggleNotification = (id: string) => {
    setNotificationSettings(
      notificationSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        {/* Settings Layout */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-1 sticky top-6">
              {[
                { id: "general", label: "General", icon: Settings },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "privacy", label: "Privacy & Security", icon: Lock },
                { id: "appearance", label: "Appearance", icon: Palette },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? "bg-teal-100 dark:bg-teal-900/30 text-teal-900 dark:text-teal-100"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Email Address</Label>
                      <Input
                        value={userData.email}
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData({ ...userData, phone: e.target.value })
                        }
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Organization/Department</Label>
                      <Input
                        value={userData.department}
                        disabled
                        className="mt-2 bg-muted"
                      />
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>API Key</CardTitle>
                    <CardDescription>Manage your API keys for integrations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm">Your API Key</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          value="sk_live_••••••••••••••••••••••••"
                          disabled
                          className="bg-muted font-mono text-xs"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Regenerate Key
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notificationSettings.map((setting) => (
                      <div
                        key={setting.id}
                        className="flex items-start justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{setting.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {setting.description}
                          </p>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={() => toggleNotification(setting.id)}
                          className="ml-4"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Channels</CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-sm">In-App Notifications</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Receive notifications in your dashboard
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-sm">Email Notifications</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Receive important updates via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium text-sm">SMS Notifications</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Receive urgent alerts via SMS
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Privacy & Security Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Security</CardTitle>
                    <CardDescription>Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Enable Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control your privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {privacySettings.map((setting) => (
                      <div key={setting.id} className="p-3 rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">{setting.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {setting.description}
                            </p>
                          </div>
                        </div>
                        <Select defaultValue={setting.value}>
                          <SelectTrigger className="w-full mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="friends">Friends Only</SelectItem>
                            <SelectItem value="private">Only Me</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active login sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">This Device</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Windows • Chrome • Last active now
                          </p>
                        </div>
                        <Badge className="bg-green-600 text-white">Active</Badge>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">iPhone 14 Pro</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            iOS • Safari • Last active 2 hours ago
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <AppearanceSettings />
            )}

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-900/50">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-red-200 dark:border-red-900/50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out From All Devices
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SSGLayout>
  );
};

export default SSGSettings;

