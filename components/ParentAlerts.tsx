"use client";

import { useState } from "react";
import { useInterventions } from "@/context/InterventionProvider";
import { students } from "@/lib/data";

export function ParentAlerts() {
  const { drafts } = useInterventions();
  const withChildren = students.filter((s) => s.language === "hi" || s.language === "en");
  const [childId, setChildId] = useState(withChildren[0]?.id ?? "S001");

  const child = students.find((s) => s.id === childId);
  const draft = child ? drafts[child.id] : undefined;
  const showAlert = draft?.status === "approved";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <label className="text-xs font-medium text-slate-500" htmlFor="child">
          View as guardian
        </label>
        <select
          id="child"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          value={childId}
          onChange={(e) => setChildId(e.target.value)}
        >
          {withChildren.map((s) => (
            <option key={s.id} value={s.id}>
              {s.parentName}, {s.name} (Class {s.grade})
            </option>
          ))}
        </select>
      </div>

      {showAlert && child && draft ? (
        <>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-emerald-800">School alert</p>
            <p className="mt-2 text-sm text-slate-800">{draft.parentMessageEn}</p>
            <p className="mt-1 text-xs text-slate-500">
              Approved {draft.approvedAt ? new Date(draft.approvedAt).toLocaleString() : "today"}
            </p>
          </div>

          {child.language === "hi" ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase text-slate-500">हिंदी · Parent connect</p>
              <p className="mt-2 text-sm text-slate-800 leading-relaxed">{draft.parentMessageHi}</p>
              <p className="mt-3 text-xs text-slate-500">
                Ready for WhatsApp or SMS delivery.
              </p>
            </div>
          ) : null}

          <div className="rounded-xl bg-[#eef2fd] p-4 text-sm text-slate-700">
            <p className="font-semibold text-[#1f3f9e]">How you can help at home</p>
            <ul className="mt-2 list-disc pl-5">
              <li>20 minutes daily practice on weak topics</li>
              <li>Ensure regular attendance this fortnight</li>
              <li>Contact class teacher if stress or health issues</li>
            </ul>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm font-medium text-slate-800">No alert yet for this child</p>
          <p className="mt-2 text-sm text-slate-600">
            Teachers must approve an intervention first. Try: Teacher portal → select{" "}
            <strong>{child?.name ?? "student"}</strong> → Approve &amp; notify parent, then return
            here.
          </p>
        </div>
      )}
    </div>
  );
}