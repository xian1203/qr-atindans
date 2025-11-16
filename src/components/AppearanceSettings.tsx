import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Globe, Monitor, Moon, Sun } from "lucide-react";
import { useAppearance } from "@/hooks/use-appearance";

export const AppearanceSettings = () => {
  const {
    settings,
    updateTheme,
    updateLanguage,
    updateFontSize,
    updateColorScheme,
    toggleCompactView,
    toggleAnimations,
  } = useAppearance();

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Theme
          </CardTitle>
          <CardDescription>Choose your preferred color theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <button
              onClick={() => updateTheme("light")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.theme === "light"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
              title="Light"
            >
              <Sun className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-medium text-center">Light</p>
            </button>

            <button
              onClick={() => updateTheme("dark")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.theme === "dark"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
              title="Dark"
            >
              <Moon className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-medium text-center">Dark</p>
            </button>

            <button
              onClick={() => updateTheme("system")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.theme === "system"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
              title="System"
            >
              <Monitor className="w-6 h-6 mx-auto mb-2" />
              <p className="text-xs font-medium text-center">System</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language
          </CardTitle>
          <CardDescription>Select your preferred language</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={settings.language} onValueChange={updateLanguage}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">🇬🇧 English</SelectItem>
              <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
              <SelectItem value="french">🇫🇷 French</SelectItem>
              <SelectItem value="german">🇩🇪 German</SelectItem>
              <SelectItem value="tagalog">🇵🇭 Tagalog</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Display Options */}
      <Card>
        <CardHeader>
          <CardTitle>Display Options</CardTitle>
          <CardDescription>Customize how content is displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-view">Compact View</Label>
            <Switch
              id="compact-view"
              checked={settings.compactView}
              onCheckedChange={toggleCompactView}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Enable Animations</Label>
            <Switch
              id="animations"
              checked={settings.animations}
              onCheckedChange={toggleAnimations}
            />
          </div>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card>
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
          <CardDescription>Adjust the text size for better readability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => updateFontSize("small")}
              className={`p-3 rounded-lg border-2 transition-all ${
                settings.fontSize === "small"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
            >
              <p className="text-xs font-medium">Small</p>
            </button>

            <button
              onClick={() => updateFontSize("normal")}
              className={`p-3 rounded-lg border-2 transition-all ${
                settings.fontSize === "normal"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
            >
              <p className="text-sm font-medium">Normal</p>
            </button>

            <button
              onClick={() => updateFontSize("large")}
              className={`p-3 rounded-lg border-2 transition-all ${
                settings.fontSize === "large"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
            >
              <p className="text-base font-medium">Large</p>
            </button>
          </div>
          <p className="text-sm text-muted-foreground">
            Current: <span className="capitalize font-medium">{settings.fontSize}</span>
          </p>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Color Scheme
          </CardTitle>
          <CardDescription>Choose your preferred accent color</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <button
              onClick={() => updateColorScheme("teal")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.colorScheme === "teal"
                  ? "border-teal-500 ring-2 ring-teal-400"
                  : "border-border hover:border-teal-400"
              }`}
              title="Teal"
            >
              <div className="w-6 h-6 mx-auto rounded-lg bg-teal-500"></div>
              <p className="text-xs font-medium mt-2 text-center">Teal</p>
            </button>

            <button
              onClick={() => updateColorScheme("blue")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.colorScheme === "blue"
                  ? "border-blue-500 ring-2 ring-blue-400"
                  : "border-border hover:border-blue-400"
              }`}
              title="Blue"
            >
              <div className="w-6 h-6 mx-auto rounded-lg bg-blue-500"></div>
              <p className="text-xs font-medium mt-2 text-center">Blue</p>
            </button>

            <button
              onClick={() => updateColorScheme("green")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.colorScheme === "green"
                  ? "border-green-500 ring-2 ring-green-400"
                  : "border-border hover:border-green-400"
              }`}
              title="Green"
            >
              <div className="w-6 h-6 mx-auto rounded-lg bg-green-500"></div>
              <p className="text-xs font-medium mt-2 text-center">Green</p>
            </button>

            <button
              onClick={() => updateColorScheme("purple")}
              className={`p-4 rounded-lg border-2 transition-all ${
                settings.colorScheme === "purple"
                  ? "border-purple-500 ring-2 ring-purple-400"
                  : "border-border hover:border-purple-400"
              }`}
              title="Purple"
            >
              <div className="w-6 h-6 mx-auto rounded-lg bg-purple-500"></div>
              <p className="text-xs font-medium mt-2 text-center">Purple</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
