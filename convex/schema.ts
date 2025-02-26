import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    events: defineTable({
        name: v.string(),
        description: v.string(),
        location: v.string(),
        eventDate: v.string(), // Store as ISO 8601 string (e.g., "2025-05-12T19:00:00Z")
        price: v.number(),
        totalTickets: v.number(),
        userId: v.string(),
        imageStorageId: v.optional(v.id("_storage")),
        is_cancelled: v.optional(v.boolean()),
    }),
    users:defineTable({

        name:v.string(),
        email:v.string(),
        userId:v.string(),
        stripeConnectId:v.optional(v.string()),
    })  .index("by_email",["email"])
        .index("by_userId",["userId"])

})