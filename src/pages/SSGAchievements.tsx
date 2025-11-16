import { SSGLayout } from "@/components/Layout/SSGLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Award,
  Target,
  Zap,
  Users,
  Calendar,
  TrendingUp,
  Lock,
  Share2,
} from "lucide-react";
import { useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlockedDate: string;
  category: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  points: number;
}

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  target: number;
  unlockedDate?: string;
}

const SSGAchievements = () => {
  const [selectedTab, setSelectedTab] = useState("unlocked");

  const unlockedAchievements: Achievement[] = [
    {
      id: "1",
      title: "Event Master",
      description: "Successfully organized 10 events",
      icon: <Trophy className="w-8 h-8 text-yellow-500" />,
      unlockedDate: "Nov 10, 2024",
      category: "Organization",
      rarity: "rare",
      points: 500,
    },
    {
      id: "2",
      title: "Attendance King",
      description: "Achieved 95% attendance rate",
      icon: <Award className="w-8 h-8 text-purple-500" />,
      unlockedDate: "Nov 5, 2024",
      category: "Participation",
      rarity: "uncommon",
      points: 300,
    },
    {
      id: "3",
      title: "Community Builder",
      description: "Brought together 500+ participants",
      icon: <Users className="w-8 h-8 text-blue-500" />,
      unlockedDate: "Oct 28, 2024",
      category: "Impact",
      rarity: "legendary",
      points: 750,
    },
    {
      id: "4",
      title: "Trending Topic",
      description: "Event reached 1000+ views",
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      unlockedDate: "Oct 15, 2024",
      category: "Engagement",
      rarity: "uncommon",
      points: 250,
    },
    {
      id: "5",
      title: "Quick Starter",
      description: "Created first event within 24 hours",
      icon: <Zap className="w-8 h-8 text-teal-500" />,
      unlockedDate: "Sep 1, 2024",
      category: "Speed",
      rarity: "common",
      points: 100,
    },
  ];

  const lockedAchievements: Achievement[] = [
    {
      id: "6",
      title: "Legend Status",
      description: "Organize 25 successful events",
      icon: <Trophy className="w-8 h-8 text-gray-400" />,
      unlockedDate: "",
      category: "Organization",
      rarity: "legendary",
      points: 1000,
    },
    {
      id: "7",
      title: "Perfect Score",
      description: "All events rated 5 stars",
      icon: <Star className="w-8 h-8 text-gray-400" />,
      unlockedDate: "",
      category: "Quality",
      rarity: "rare",
      points: 600,
    },
    {
      id: "8",
      title: "Marathon Runner",
      description: "Organize events for 12 consecutive months",
      icon: <Calendar className="w-8 h-8 text-gray-400" />,
      unlockedDate: "",
      category: "Dedication",
      rarity: "rare",
      points: 500,
    },
  ];

  const progressBadges: Badge[] = [
    {
      id: "1",
      title: "Event Organizer",
      description: "Organize 20 events",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      progress: 12,
      target: 20,
      unlockedDate: undefined,
    },
    {
      id: "2",
      title: "Engagement Expert",
      description: "Reach 10,000 total participants",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      progress: 7500,
      target: 10000,
      unlockedDate: undefined,
    },
    {
      id: "3",
      title: "Budget Wizard",
      description: "Manage ₱1,000,000 budget",
      icon: <Award className="w-6 h-6 text-green-500" />,
      progress: 780000,
      target: 1000000,
      unlockedDate: undefined,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
      case "uncommon":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200";
      case "rare":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200";
      case "legendary":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const totalPoints = unlockedAchievements.reduce((sum, ach) => sum + ach.points, 0);

  return (
    <SSGLayout userName="SSG President">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Achievements</h1>
            <p className="text-muted-foreground">Track your accomplishments and earn badges</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" gap-2>
              <Share2 className="w-4 h-4" />
              Share Profile
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold text-yellow-600">{totalPoints.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">From {unlockedAchievements.length} achievements</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Achievements Unlocked</p>
                <p className="text-3xl font-bold text-teal-600">{unlockedAchievements.length}</p>
                <p className="text-xs text-muted-foreground">Out of {unlockedAchievements.length + lockedAchievements.length} total</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold text-green-600">63%</p>
                <p className="text-xs text-muted-foreground">Keep going!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setSelectedTab("unlocked")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              selectedTab === "unlocked"
                ? "border-teal-500 text-teal-600 dark:text-teal-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Unlocked ({unlockedAchievements.length})
          </button>
          <button
            onClick={() => setSelectedTab("locked")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              selectedTab === "locked"
                ? "border-teal-500 text-teal-600 dark:text-teal-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Locked ({lockedAchievements.length})
          </button>
          <button
            onClick={() => setSelectedTab("progress")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              selectedTab === "progress"
                ? "border-teal-500 text-teal-600 dark:text-teal-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            In Progress
          </button>
        </div>

        {/* Unlocked Achievements */}
        {selectedTab === "unlocked" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {unlockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-muted rounded-lg">{achievement.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm">{achievement.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                      <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        +{achievement.points} pts
                      </Badge>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">Unlocked {achievement.unlockedDate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Locked Achievements */}
        {selectedTab === "locked" && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="opacity-60 hover:opacity-100 transition-opacity">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 bg-muted rounded-lg relative">
                      {achievement.icon}
                      <Lock className="w-4 h-4 absolute bottom-0 right-0 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{achievement.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                      <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        +{achievement.points} pts
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" disabled>
                      Locked
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Progress Badges */}
        {selectedTab === "progress" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {progressBadges.map((badge) => {
              const percentage = Math.round((badge.progress / badge.target) * 100);
              return (
                <Card key={badge.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-muted rounded-lg">{badge.icon}</div>
                          <div>
                            <h3 className="font-semibold">{badge.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Progress</span>
                          <span className="text-muted-foreground">
                            {badge.progress.toLocaleString()} / {badge.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={percentage} className="h-3" />
                        <p className="text-xs text-muted-foreground">{percentage}% Complete</p>
                      </div>

                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Achievement Categories */}
        {selectedTab === "unlocked" && (
          <Card className="border-t-4 border-t-teal-500">
            <CardHeader>
              <CardTitle>Achievement Categories</CardTitle>
              <CardDescription>Your progress across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {[
                  { name: "Organization", count: 2, total: 3 },
                  { name: "Participation", count: 1, total: 2 },
                  { name: "Impact", count: 1, total: 2 },
                  { name: "Engagement", count: 1, total: 2 },
                  { name: "Speed", count: 1, total: 1 },
                ].map((cat) => (
                  <div key={cat.name} className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="font-semibold text-sm">{cat.name}</p>
                    <p className="text-2xl font-bold text-teal-600 mt-1">
                      {cat.count}/{cat.total}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((cat.count / cat.total) * 100)}%
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </SSGLayout>
  );
};

export default SSGAchievements;

