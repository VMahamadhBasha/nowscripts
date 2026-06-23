import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { NowScriptsOfficialLogo, NowScriptsStamp, HRSignature } from "../../assets/certificate-assets";

export interface CertificateData {
  candidateName: string;
  email: string;
  internshipTitle: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  mentorName: string;
  department?: string;
  projectUndertaken?: string;
  location?: string;
  certificateId: string;
  verificationNumber: string;
  templateType: string;
  companyName: string;
}

export const CertificateTemplate = React.forwardRef<HTMLDivElement, { data: CertificateData }>(({ data }, ref) => {
  const isCompletionLetter = data.templateType === "Internship Completion Letter";
  
  // Format dates cleanly (e.g., "June 23, 2026")
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  const formatMonthYear = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div 
      ref={ref}
      // A4 dimensions at 96 DPI
      className="bg-white relative mx-auto text-black font-sans"
      style={{ width: "794px", height: "1123px", padding: "60px 80px", boxSizing: "border-box" }}
    >
      {/* Header */}
      <div className="flex justify-end mb-4">
        <NowScriptsOfficialLogo />
      </div>

      <div className="text-center mb-10">
        <a href="https://nowscripts.com" className="text-blue-600 underline text-lg font-medium tracking-wide decoration-1 underline-offset-4">
          {data.companyName}
        </a>
      </div>

      <h1 className="text-4xl font-extrabold text-center text-[#0F172A] mb-12 tracking-tight">
        {data.templateType}
      </h1>

      <div className="text-right mb-12">
        <p className="font-bold text-gray-900 text-lg">{formatDate(data.issueDate)}</p>
      </div>

      <div className="mb-12 space-y-1">
        <h2 className="text-2xl font-bold text-[#0F172A]">Name: {data.candidateName || "[Candidate Name]"}</h2>
        <p className="text-gray-600 text-sm">
          Certificate ID: <span className="font-semibold text-gray-800">{data.certificateId || "[Auto-Generated]"}</span> · {data.location || "Full-time Remote"}
        </p>
      </div>

      <div className="text-[17px] leading-relaxed text-gray-900 space-y-8 min-h-[300px]">
        {isCompletionLetter ? (
          <>
            <p>
              This is to certify that <strong>{data.candidateName || "[Candidate Name]"}</strong> was an intern in our organization from <strong>{formatMonthYear(data.startDate)}</strong> to <strong>{formatMonthYear(data.endDate)}</strong> as part of the <strong>{data.internshipTitle || "[Internship Program]"}</strong>, under the mentorship of <strong>{data.mentorName || "[Mentor Name]"}</strong> and has successfully completed the internship.
            </p>
            <div>
              <p className="mb-2">Project undertaken:</p>
              <ol className="list-decimal pl-8 font-semibold space-y-2">
                <li>{data.projectUndertaken || "[Project details will appear here]"}</li>
              </ol>
            </div>
            <p>We wish you all the best for your future endeavors.</p>
          </>
        ) : (
           // General Certificate Text
           <>
            <p className="text-center italic text-xl text-gray-600 my-8">This certifies that</p>
            <p className="text-center text-3xl font-bold text-[#0F172A] mb-8">{data.candidateName || "[Candidate Name]"}</p>
            <p className="text-center">
              has successfully completed the <strong>{data.internshipTitle || "[Internship Program]"}</strong> from <strong>{formatMonthYear(data.startDate)}</strong> to <strong>{formatMonthYear(data.endDate)}</strong>.
            </p>
            {data.projectUndertaken && (
              <p className="text-center mt-4">
                Outstanding contribution on: <strong>{data.projectUndertaken}</strong>
              </p>
            )}
           </>
        )}
      </div>

      {/* Signatures & Stamp */}
      <div className="mt-16 space-y-6 relative">
        <p className="text-[17px] text-gray-900">Sincere Regards</p>
        <p className="text-[17px] text-gray-900">For {data.companyName}</p>
        
        <div className="mt-8">
          <NowScriptsStamp />
        </div>

        <div className="mt-4">
          <p className="text-[17px] text-gray-900">HR Department</p>
          <p className="text-[17px] font-bold text-gray-900">Senior Director – HR Shared Service</p>
        </div>

        {/* HR Signature Overlay */}
        <div className="absolute bottom-[80px] left-[150px] opacity-80 pointer-events-none">
          <HRSignature />
        </div>
      </div>

      {/* Footer Branding and Verification */}
      <div className="absolute bottom-[60px] left-[80px] right-[80px] flex justify-between items-end border-t border-gray-200 pt-6">
        <div className="flex gap-8 text-sm text-gray-500 items-center">
          <span className="flex items-center gap-1.5 text-blue-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            https://nowscripts.com
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {data.location || "Remote"}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            verify@nowscripts.com
          </span>
        </div>
        
        {/* QR Code */}
        <div className="flex flex-col items-end">
          <div className="p-1.5 bg-white border border-gray-200 rounded shadow-sm mb-2">
            <QRCodeSVG 
              value={data.certificateId ? `https://nowscripts.com/verify/${data.certificateId}` : 'https://nowscripts.com/verify'} 
              size={64} 
            />
          </div>
          <span className="text-[10px] text-gray-400 font-mono">Scan to Verify</span>
        </div>
      </div>
    </div>
  );
});
