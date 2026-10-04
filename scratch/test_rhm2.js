const { z } = require('zod');
const schema = z.object({
  profile: z.object({
    email: z.string().email("Must be a valid email"),
  })
});
// simulate RHM submitting defaultValues along with registered inputs
const defaultValues = { profile: { email: "test@test.com" } };
const registeredInputs = { profile: { } }; 
// Wait, React Hook Form does NOT merge defaultValues deeply at submit time!
// It ONLY submits what is registered + what is explicitly given to reset/setValue, OR it returns the current form values which includes unregistered defaultValues?
// Let's test React Hook Form behavior in node.
