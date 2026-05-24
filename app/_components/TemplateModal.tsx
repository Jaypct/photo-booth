"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SelectedTemplateTypes } from "../_types/template";
import { templates } from "../_lib/templates/templates";

const TemplateModal = () => {
  const router = useRouter();
  const [SelectedTemplate, setSelectedTemplate] =
    useState<SelectedTemplateTypes>();

  const handleClick = (template: SelectedTemplateTypes) => {
    setSelectedTemplate(template);

    // navigate to another page
    router.push(`/session/${template.id}`);
  };
  return (
    <div className="absolute flex items-center justify-center">
      {templates.map((template) => (
        <button key={template.id} onClick={() => handleClick(template)}>
          <img src={template.preview} className="w-100 h-100" />
          <p>{template.name}</p>
        </button>
      ))}
    </div>
  );
};

export default TemplateModal;
