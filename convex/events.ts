import { query } from "./_generated/server";

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});


export const getEvents = query({
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const updateEventImage = mutation({
  args: { eventId: v.id("events"), imageStorageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.eventId, { imageStorageId: args.imageStorageId });
  },
});

export const get = query({
    
args:{},    
handler:async (ctx) => {
  return await ctx.db
    .query("events")
    .filter((q) => q.eq(q.field("is_cancelled"), false))
    .collect();
}
});
