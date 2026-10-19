import { DevlogForm } from "../_components/DevlogForm";

export const metadata = {
  title: "New Devlog Entry | RHEVA",
};

export default function NewDevlogPage() {
  return (
    <div className="w-full">
      <DevlogForm />
    </div>
  );
}
