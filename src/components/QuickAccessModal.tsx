import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const QuickAccessModal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
}: QuickAccessModalProps) => {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <Card className="bg-white dark:bg-slate-950 border border-border rounded-lg shadow-2xl">
          <CardHeader className="border-b bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{icon}</div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {title}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {description}
                  </CardDescription>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800 text-center">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">87%</div>
                <div className="text-xs text-green-600 dark:text-green-400">Success Rate</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">12</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Total Entries</div>
              </div>
            </div>

            {/* Input Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Quick Entry</label>
              <Input
                type="text"
                placeholder="Enter data or scan QR code..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="font-mono"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                onClick={() => {
                  if (input.trim()) {
                    console.log("Submitted:", input);
                    setInput("");
                    // Add your logic here
                  }
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Submit
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="mt-4 pt-4 border-t space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Recent</p>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-900 text-xs">
                    <span>Entry #{1000 + i}</span>
                    <Badge variant="outline" className="text-xs">Success</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
