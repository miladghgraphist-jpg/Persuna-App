import { SupabaseClient } from "@supabase/supabase-js";

export type DbRecord = Record<string, any>;

export async function listWorkspaceRecords(
  supabase: SupabaseClient,
  table: string,
  workspaceId: string,
  options?: { orderBy?: string; ascending?: boolean }
) {
  let query = supabase.from(table).select("*").eq("workspace_id", workspaceId);
  if (options?.orderBy) query = query.order(options.orderBy, { ascending: options.ascending ?? false });
  const result = await query;
  if (result.error) throw result.error;
  return result.data ?? [];
}

export async function insertWorkspaceRecord(
  supabase: SupabaseClient,
  table: string,
  values: DbRecord
) {
  const result = await supabase.from(table).insert(values).select("id").single();
  if (result.error) throw result.error;
  if (!result.data?.id) throw new Error("Record was not created.");
  return result.data;
}

export async function updateWorkspaceRecord(
  supabase: SupabaseClient,
  table: string,
  id: string,
  workspaceId: string,
  values: DbRecord
) {
  const result = await supabase
    .from(table)
    .update(values)
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .select("id")
    .maybeSingle();

  if (result.error) throw result.error;
  if (!result.data?.id) {
    throw new Error("Record was not updated. It may no longer exist or you may not have access to it.");
  }
  return result.data;
}

export async function deleteWorkspaceRecord(
  supabase: SupabaseClient,
  table: string,
  id: string,
  workspaceId: string
) {
  const result = await supabase
    .from(table)
    .delete()
    .eq("id", id)
    .eq("workspace_id", workspaceId)
    .select("id")
    .maybeSingle();

  if (result.error) throw result.error;
  if (!result.data?.id) {
    throw new Error("Record was not deleted. It may no longer exist or you may not have access to it.");
  }
  return result.data;
}
