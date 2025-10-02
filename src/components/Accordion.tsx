"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ } from "@/types/faq";
import { useLocale } from "next-intl";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  items?: AccordionItem[]; // Legacy support
  faqs?: FAQ[]; // New API data
  className?: string;
}

const Accordion = ({ items, faqs, className = "" }: AccordionProps) => {
  const locale = useLocale();
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    // If clicking the same item, close it; otherwise open the new one
    setOpenItemId(openItemId === itemId ? null : itemId);
  };

  // Convert FAQ data to accordion items format
  const accordionItems = faqs
    ? faqs.map((faq) => ({
        id: faq._id,
        title:
          faq.question[locale as keyof typeof faq.question] || faq.question.en,
        content: faq.answer[locale as keyof typeof faq.answer] || faq.answer.en,
      }))
    : items || [];

  return (
    <div className={`space-y-4 ${className}`}>
      {accordionItems.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          {/* Accordion Header */}
          <button
            onClick={() => toggleItem(item.id)}
            className={`w-full px-6 py-4 text-left transition-colors duration-200 flex items-center justify-between group cursor-pointer ${
              openItemId === item.id
                ? "bg-web-primary text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <h3
              className={`text-lg font-medium ${
                openItemId === item.id
                  ? "text-white"
                  : "text-gray-800 group-hover:text-web-primary transition-colors"
              }`}
            >
              {item.title}
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openItemId === item.id ? "rotate-180 text-web-primary" : ""
              }`}
            />
          </button>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openItemId === item.id
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-web-primary leading-relaxed">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
