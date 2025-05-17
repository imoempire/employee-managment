import React from "react";
import { Paper, Text, Title, Button, Textarea } from "@mantine/core";
import {
  IconMessage,
  IconPhone,
  IconMail,
  IconHelpCircle,
} from "@tabler/icons-react";

export default function page() {
  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between mb-8 items-center">
          <div>
            <h1 className="text-3xl font-bold mb-0.5">Support</h1>
            <p className="text-xl">
              Required training for all drone sales and repair technicians
            </p>
          </div>
        </div>
        {/* Top Section: Contact Options and Submit Inquiry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Contact Options */}
          <Paper shadow="sm" p="lg" radius="md" withBorder className="h-full">
            <Title order={2} className="text-2xl font-bold mb-2">
              Contact Options
            </Title>
            <Text size="sm" c="#64748b" mb={"lg"}>
              Reach out to us through your preferred channel
            </Text>
            <div className="space-y-4">
              <div className="flex items-center">
                <IconMessage className="text-blue-500 mr-3" size={24} />
                <div>
                  <Text size="sm" className="font-semibold">
                    Live Chat
                  </Text>
                  <Text size="xs" c="#64748b">
                    Available 8am-5pm, Mon-Fri
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <IconPhone className="text-blue-500 mr-3" size={24} />
                <div>
                  <Text size="sm" className="font-semibold">
                    Support Hotline
                  </Text>
                  <Text size="xs" c="#64748b">
                    1-800-555-HELP
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <IconMail className="text-blue-500 mr-3" size={24} />
                <div>
                  <Text size="sm" className="font-semibold">
                    Email Support
                  </Text>
                  <Text size="xs" c="#64748b">
                    support@company.com
                  </Text>
                </div>
              </div>
              <div className="flex items-center">
                <IconHelpCircle className="text-blue-500 mr-3" size={24} />
                <div>
                  <Text size="sm" className="font-semibold">
                    Help Center
                  </Text>
                  <Text size="xs" c="#64748b">
                    Browse FAQs and knowledge base
                  </Text>
                </div>
              </div>
            </div>
          </Paper>

          {/* Submit an Inquiry */}
          <Paper shadow="sm" p="lg" radius="md" withBorder className="h-full">
            <Title order={2} className="text-2xl font-bold mb-2">
              Submit an Inquiry
            </Title>
            <Text size="sm" c="#64748b" mb={"lg"}>
              We’ll respond to your question as soon as possible
            </Text>

            <Textarea
              label={"Your question or concern"}
              placeholder="Describe what you need help with..."
              minRows={4}
              className="mb-4"
            />
            <Button fullWidth color="dark">
              Submit Request
            </Button>
          </Paper>
        </div>

        {/* Frequently Asked Questions */}
        <Paper shadow="sm" p="lg" radius="md" withBorder>
          <Title order={2} className="text-2xl font-bold mb-2">
            Frequently Asked Questions
          </Title>
          <Text fw={'500'} size="sm" c="#64748b" mb={'lg'}>
            Quick answers to common questions
          </Text>
          <div className="space-y-4">
            <div>
              <Text size="sm" className="font-semibold">
                How do I reset my password?
              </Text>
              <Text size="sm" c="#64748b">
                Visit the Employee Settings page and click on “Reset Password”
                under the Security section.
              </Text>
            </div>
            <div>
              <Text size="sm" className="font-semibold">
                Where can I find my training progress?
              </Text>
              <Text size="sm" c="#64748b">
                Your training progress is displayed on your Employee Profile
                page and in the Training Videos section.
              </Text>
            </div>
            <div>
              <Text size="sm" className="font-semibold">
                How do I update my contact information?
              </Text>
              <Text size="sm" c="#64748b">
                Go to the Employee Profile page where you can edit and update
                your personal information.
              </Text>
            </div>
            <div>
              <Text size="sm" className="font-semibold">
                When are new training videos added?
              </Text>
              <Text size="sm" c="#64748b">
                New training content is typically added at the beginning of each
                month. You’ll receive a notification when new material is
                available.
              </Text>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
