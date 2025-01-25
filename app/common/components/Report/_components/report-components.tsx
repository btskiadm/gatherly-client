"use client";

import { flattenIssues, maxReportContent, ReportInput, reportSchema, ZodFlattenIssue } from "@/app/common/utils/zod";
import { FormControl, FormLabel, Stack, TextField } from "@mui/material";
import { RefObject, useCallback, useImperativeHandle, useState } from "react";
import { TruncatedFormHelperText } from "../../truncated-form-helper-text";

export interface ReportData {
  success: boolean;
  data?: ReportInput;
}

export interface ReportRef {
  handleData: () => ReportData;
}

interface Props {
  ref: RefObject<ReportRef | null>;
}

export const Report = ({ ref }: Props) => {
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<ZodFlattenIssue>({});

  const handleData = useCallback((): ReportData => {
    const { data, success, error } = reportSchema.safeParse({
      content,
    });

    if (error) {
      setErrors(flattenIssues(error?.issues));
    }

    return {
      success,
      data,
    };
  }, [content]);

  useImperativeHandle(ref, () => ({
    handleData: handleData,
  }));

  const handleContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const contentError = errors["content"];

  return (
    <Stack width="100%">
      <FormControl error={!!contentError} fullWidth>
        <FormLabel>Report</FormLabel>
        <TextField placeholder="Description.." multiline minRows={6} value={content} onChange={handleContent} />
        <TruncatedFormHelperText>
          {!contentError ? (
            <>
              Dostępne znaki: {content.length}/{maxReportContent}
            </>
          ) : (
            contentError.message
          )}
        </TruncatedFormHelperText>
      </FormControl>
    </Stack>
  );
};
