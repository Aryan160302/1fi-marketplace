import { Search } from "lucide-react";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search online stores...",
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex h-12 items-center gap-2.5 rounded-pill bg-white px-4 shadow-card">
      <Search size={18} className="text-gray-400" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none"
      />
    </div>
  );
}
