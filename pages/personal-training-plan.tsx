import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import Text from "@/components/shared/Text";
import { Github } from "@/components/shared/icons";
import Layout from "@/components/shared/layout";
import DropDown, { VibeType } from "@/components/twitter-bio/DropDown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PersonalTrainingPlan: NextPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [fitnessGoal, setFitnessGoal] = React.useState("");
  const [activityLevel, setActivityLevel] = React.useState("");
  const [timeCommitment, setTimeCommitment] = React.useState("");
  const [accessToGym, setAccessToGym] = React.useState("");
  const [medicalConditions, setMedicalConditions] = React.useState("");

  const [bio, setBio] = React.useState("");
  const [vibe, setVibe] = React.useState<VibeType>("Professional");
  const [generatedTrainingPlan, setGeneratedTrainingPlan] =
    React.useState<String>("");

  const planRef = React.useRef<null | HTMLDivElement>(null);

  const scrollToPlan = () => {
    if (planRef.current !== null) {
      planRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `Generate 2 ${vibe} twitter biographies with no hashtags and clearly labeled "1." and "2.". ${
    vibe === "Funny"
      ? "Make sure there is a joke in there and it's a little ridiculous."
      : null
  }
      Make sure each generated biography is less than 160 characters, has short sentences that are found in Twitter bios, and base them on this context: ${bio}${
    bio.slice(-1) === "." ? "" : "."
  }`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("age: ", age);
    console.log("gender: ", gender);
    console.log("weight: ", weight);
    console.log("height: ", height);
    console.log("fitnessGoal: ", fitnessGoal);
    console.log("activityLevel: ", activityLevel);
    console.log("timeCommitment: ", timeCommitment);
    console.log("accessToGym: ", accessToGym);
    console.log("medicalConditions: ", medicalConditions);
    setGeneratedTrainingPlan("");
    setLoading(true);
    const response = await fetch("/api/personal-training-plan/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // prompt,
        age,
        gender,
        weight,
        height,
        fitnessGoal,
        activityLevel,
        timeCommitment,
        accessToGym,
        medicalConditions,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTrainingPlan((prev) => prev + chunkValue);
    }
    scrollToPlan();
    setLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>Personal Training Plan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4 text-center sm:mt-20">
        <a
          className="mb-5 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100"
          href="https://github.com/juancamiloqhz/ai-workshop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a>
        <Text variant="h1" className="max-w-[908px]">
          Generate your personal training plan with AI
        </Text>
        <p className="mt-5 text-slate-500">
          47,118 people have already done it
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-8 w-full max-w-2xl space-y-6">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                id="age"
                placeholder="Your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min={1}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={gender}
                onValueChange={setGender}
                required
                name="gender"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="weight">Weight (Kg)</Label>
              <Input
                type="number"
                id="weight"
                placeholder="Your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                min={1}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                type="number"
                id="height"
                placeholder="Your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                min={1}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="injuries">Fitness goal</Label>
              <Select
                value={fitnessGoal}
                onValueChange={setFitnessGoal}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight loss">Weight loss</SelectItem>
                  <SelectItem value="muscle gain">Muscle gain</SelectItem>
                  <SelectItem value="general fitness">
                    General fitness
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="injuries">Current activity level</Label>
              <Select
                value={activityLevel}
                onValueChange={setActivityLevel}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="lightly active">Lightly active</SelectItem>
                  <SelectItem value="moderately active">
                    Moderately active
                  </SelectItem>
                  <SelectItem value="very active">Very active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="injuries">Time commitment per week</Label>
              <Select
                value={timeCommitment}
                onValueChange={setTimeCommitment}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  {["1-2", "3-4", "5-6", "7", "more than 7"].map((time) => (
                    <SelectItem key={time} value={time}>
                      {time} hours
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="injuries">
                Access to gym or exercise equipment?
              </Label>
              <Select
                value={accessToGym}
                onValueChange={setAccessToGym}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="medicalConditions">
              Any existing medical conditions or injuries
            </Label>
            <Textarea
              placeholder="Add any existing medical conditions or injuries"
              id="medicalConditions"
              value={medicalConditions}
              onChange={(e) => setMedicalConditions(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full max-w-2xl">
          {!loading && (
            <Button size="lg" className="mt-8 w-full" type="submit">
              Generate your training plan &rarr;
            </Button>
          )}
          {loading && (
            <Button size="lg" className="mt-8 w-full" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="border-1 h-px bg-gray-700 dark:bg-gray-700" />
      <div className="my-10 space-y-10">
        {generatedTrainingPlan && (
          <>
            <div>
              <h2
                className="mx-auto text-3xl font-bold text-slate-900 sm:text-4xl"
                ref={planRef}
              >
                Your generated training plan
              </h2>
            </div>
            <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-8">
              {generatedTrainingPlan
                .substring(generatedTrainingPlan.indexOf("1") + 3)
                .split("2.")
                .map((generatedPlan) => {
                  return (
                    <div
                      className="cursor-copy rounded-xl border bg-white p-4 shadow-md transition hover:bg-gray-100"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedPlan);
                        toast("Plan copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                      key={generatedPlan}
                    >
                      <p>{generatedPlan}</p>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default PersonalTrainingPlan;
