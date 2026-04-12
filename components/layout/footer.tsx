import { Mail, Stethoscope } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-background to-muted/50 pt-12 pb-8 border-t">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-teal-400 leading-tight">Medical Exam</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">UCAT</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              UK's #1 UCAT mock exam platform. Helping aspiring medical students secure their place at medical school since 2020.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="size-4" />
              <a href="mailto:hello@medicalexamucat.co.uk" className="hover:text-teal-400 transition-colors">hello@medicalexamucat.co.uk</a>
            </div>
          </div>

          {/* Practice */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Practice</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Verbal Reasoning", "/categories?subtest=vr"],
                ["Decision Making", "/categories?subtest=dm"],
                ["Quantitative Reasoning", "/categories?subtest=qr"],
                ["Abstract Reasoning", "/categories?subtest=ar"],
                ["Situational Judgement", "/categories?subtest=sjt"],
                ["Full Mock Exams", "/battle"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-muted-foreground hover:text-teal-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["UCAT Guide", "/news"],
                ["Score Calculator", "/dashboard"],
                ["Leaderboard", "/leaderboard"],
                ["Daily Challenge", "/daily-challenge"],
                ["Q&A Forum", "/quiz-discussions"],
                ["Blog & Tips", "/news"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-muted-foreground hover:text-teal-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Account</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                ["Start Free Trial", "/register"],
                ["Sign In", "/login"],
                ["Pricing", "/pricing"],
                ["Support", "/support"],
                ["Privacy Policy", "#"],
                ["Terms of Service", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-muted-foreground hover:text-teal-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Medical Exam UCAT. All rights reserved.</p>
          <p>UCAT® is a registered trademark of the University Clinical Aptitude Test Consortium. We are not affiliated with the official UCAT organisation.</p>
        </div>
      </div>
    </footer>
  );
}
