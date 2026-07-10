import React, { useState } from 'react';

// CMU Faculty of Nursing brand colors
const CMU_GOLD   = '#D4611A';   
const CMU_DARK   = '#3a3a3a';   

export interface AbsenceRecord {
  id: string;
  date: string;
  studentName: string;
  type: 'no-checkin' | 'no-checkout';
  note: string;
}

export function AbsenceTrackerPage() {
  const [records, setRecords] = useState<AbsenceRecord[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // form state
  const [date, setDate] = useState('');
  const [studentName, setStudentName] = useState('');
  const [type, setType] = useState<'no-checkin' | 'no-checkout'>('no-checkin');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setRecords(records.map(r => r.id === isEditing ? { ...r, date, studentName, type, note } : r));
      setIsEditing(null);
    } else {
      const newRecord: AbsenceRecord = {
        id: Date.now().toString(),
        date,
        studentName,
        type,
        note
      };
      setRecords([...records, newRecord]);
    }
    // reset
    setDate('');
    setStudentName('');
    setType('no-checkin');
    setNote('');
  };

  const handleEdit = (r: AbsenceRecord) => {
    setIsEditing(r.id);
    setDate(r.date);
    setStudentName(r.studentName);
    setType(r.type);
    setNote(r.note);
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-10 fade-up" style={{ opacity: 0, animationDelay: '0ms' }}>
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-[#1c1c1e]">Attendance Exceptions Tracker</h1>
      <p className="mb-8 text-[#6e6e73]">
        Record and modify dates when students missed their check-in or check-out, and add special notes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-1 p-6 rounded-[24px]" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 className="mb-4 text-xl font-bold text-[#1c1c1e]">
            {isEditing ? 'Edit Record' : 'Add Record'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#8e8e93] mb-1">Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
                required
                className="w-full rounded-xl px-4 py-2 text-sm bg-white border border-[#e5e5ea] focus:border-[#D4611A] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#8e8e93] mb-1">Student Name</label>
              <input 
                type="text" 
                value={studentName} 
                onChange={e => setStudentName(e.target.value)} 
                required
                placeholder="e.g. Jane Doe"
                className="w-full rounded-xl px-4 py-2 text-sm bg-white border border-[#e5e5ea] focus:border-[#D4611A] outline-none"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#8e8e93] mb-1">Exception Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value as any)}
                className="w-full rounded-xl px-4 py-2 text-sm bg-white border border-[#e5e5ea] focus:border-[#D4611A] outline-none"
              >
                <option value="no-checkin">Missing Check-in</option>
                <option value="no-checkout">Missing Check-out</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#8e8e93] mb-1">Note (can be modified later)</label>
              <textarea 
                value={note} 
                onChange={e => setNote(e.target.value)} 
                rows={3}
                className="w-full rounded-xl px-4 py-2 text-sm bg-white border border-[#e5e5ea] focus:border-[#D4611A] outline-none resize-none"
                placeholder="Add details about this exception..."
              />
            </div>
            <button 
              type="submit"
              className="w-full rounded-xl py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${CMU_GOLD}, ${CMU_DARK})` }}
            >
              {isEditing ? 'Save Changes' : 'Add Record'}
            </button>
            {isEditing && (
              <button 
                type="button"
                onClick={() => {
                  setIsEditing(null);
                  setDate('');
                  setStudentName('');
                  setType('no-checkin');
                  setNote('');
                }}
                className="w-full rounded-xl py-3 text-sm font-semibold text-[#3a3a3a] transition hover:bg-black/5"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* List */}
        <div className="md:col-span-2 space-y-4">
          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[24px] py-20 text-center" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}>
              <p className="text-[15px] font-semibold text-[#3c3c43]">No records found</p>
              <p className="mt-1 text-[13px] text-[#aeaeb2]">Add a record using the form</p>
            </div>
          ) : (
            records.map(r => (
              <div key={r.id} className="p-5 rounded-[20px] flex items-start justify-between" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-[#1c1c1e] text-lg">{r.studentName}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-[#f2f2f7] text-[#8e8e93]">
                      {r.date}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${r.type === 'no-checkin' ? 'bg-[#fff0eb] text-[#D4611A]' : 'bg-[#eef5ff] text-[#0066cc]'}`}>
                      {r.type === 'no-checkin' ? 'No Check-in' : 'No Check-out'}
                    </span>
                  </div>
                  <p className="text-sm text-[#48484a] mt-2 whitespace-pre-wrap">{r.note || <span className="text-[#aeaeb2] italic">No note provided</span>}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button 
                    onClick={() => handleEdit(r)}
                    className="text-xs font-semibold hover:underline"
                    style={{ color: CMU_GOLD }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(r.id)}
                    className="text-xs font-semibold text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
