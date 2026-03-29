import { useState, useCallback } from "react";
import { generateProjectIdeas } from "../lib/api";

export function useIdeaGenerator() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    setIdeas([]);
    try {
      const result = await generateProjectIdeas(params);
      setIdeas(result);
      setGenerated(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { ideas, loading, error, generated, generate };
}
