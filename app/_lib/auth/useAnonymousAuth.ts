"use client";

import { useEffect } from "react";
import { createClient } from "../supabase/client";

export function useAnonymousAuth() {
  useEffect(() => {
    const init = async () => {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        await supabase.auth.signInAnonymously();
      }
    };

    init();
  }, []);
}
