import {
  User,
  Package,
  PiggyBank,
  Users,
  CircleHelp,
  ShieldCheck,
  ScrollText,
  LogOut,
  ChevronRight,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    icon: User,
    title: "Profile details",
    subtitle: "Name, contact and KYC info",
  },
  {
    icon: Package,
    title: "Purchases",
    subtitle: "Orders, invoices and loan status",
  },
  {
    icon: PiggyBank,
    title: "Pledge history",
    subtitle: "Funds you pledged or released",
  },
  {
    icon: Users,
    title: "Invite friends",
    subtitle: "Share the app, earn rewards",
    badge: "EARN ₹500",
  },
  {
    icon: CircleHelp,
    title: "Support & FAQs",
    subtitle: "Find answers or contact us",
  },
  {
    icon: ShieldCheck,
    title: "Privacy policy",
    subtitle: "How we handle your data",
  },
  {
    icon: ScrollText,
    title: "Terms & conditions",
    subtitle: "Rules governing your use",
  },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-5 px-4 pt-6 pb-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>
        <p className="mt-0.5 text-[13px] text-gray-500">
          Manage your account settings and personal preferences.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-[15px] font-extrabold text-brand-700">
          AC
        </div>
        <div>
          <p className="text-[16px] font-bold text-gray-900">
            Aryan Chaturvedi
          </p>
          <p className="text-[13px] text-gray-500">+91 90000 00000</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold tracking-[0.12em] text-gray-400 uppercase">
          Quick Actions
        </p>
        <div className="flex flex-col gap-2.5">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.title}
                className="flex items-center gap-3 rounded-card bg-surface-card p-3.5 shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-gray-900">
                    {action.title}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {action.subtitle}
                  </p>
                </div>
                {action.badge && (
                  <span className="rounded-pill bg-brand-100 px-2.5 py-1 text-[10px] font-bold text-brand-700">
                    {action.badge}
                  </span>
                )}
                <ChevronRight size={18} className="shrink-0 text-gray-300" />
              </div>
            );
          })}
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 rounded-card bg-surface-card p-3.5 text-[14px] font-bold text-red-600 shadow-card">
        <LogOut size={16} />
        Log out
      </button>
    </div>
  );
}
