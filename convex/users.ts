import { v } from "convex/values";
import { mutation, MutationCtx } from "./_generated/server";

export const updateUser = mutation({
  args: { 
    name: v.string(),
    email: v.string(),
    userId: v.string(),
   },
  handler: async (ctx, args) => {
    
    const existingUser = await ctx.db.query("users").withIndex("by_userId",(q)=>q.eq("userId",args.userId)).first(); 
    
    if(existingUser){
      await ctx.db.patch(existingUser._id,{name:args.name,email:args.email});
      return existingUser._id  
}
    //await ctx.db.insert("tasks", { text: args.text });
    //await trackChange(ctx, "addItem");
    const newUserId = await ctx.db.insert("users", { name: args.name, email: args.email, userId: args.userId, stripeConnectId: undefined });
    return newUserId;

},

  

}


);

