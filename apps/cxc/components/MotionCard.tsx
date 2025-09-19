"use client";

import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@uwdsc/ui";
import { useState } from "react";

export function MotionCard() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Framer Motion + Shad CN</CardTitle>
          <CardDescription>
            This card demonstrates Framer Motion animations with Shad CN UI
            components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            animate={{ rotate: isClicked ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={() => setIsClicked(!isClicked)} className="w-full">
              {isClicked ? "Rotated!" : "Click to Rotate"}
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground text-center"
          >
            Hover over the card and click the button to see animations!
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
