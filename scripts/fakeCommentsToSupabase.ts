import { createClient } from '@supabase/supabase-js';
// @ts-ignore
import girls from '../data/girls';

// Use your actual Supabase URL and anon key as in lib/supabaseClient.ts
const supabaseUrl = 'https://gsegqwijhcxdcxxkhqmx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZWdxd2lqaGN4ZGN4eGtocW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDg1MTcsImV4cCI6MjA2NTEyNDUxN30.8NaIwE5TKH_AOXYIIYCWAVHbDE_eIX7m043iwqwEk6s';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const fakeComments = [
  'بالتوفيق إن شاء الله!',
  'الله يرزقك الزوج الصالح.',
  'ملف جميل ومميز.',
  'أتمنى لك السعادة الدائمة.',
  'ما شاء الله، بنت محترمة.',
  'حظاً سعيداً في رحلتك.'
];

async function addFakeComments() {
  for (const girl of girls) {
    const commentsToAdd = [];
    for (let i = 0; i < 6; i++) {
      commentsToAdd.push({
        profile_id: girl.id,
        comment: fakeComments[Math.floor(Math.random() * fakeComments.length)]
      });
    }
    const { error } = await supabase.from('comments').insert(commentsToAdd);
    if (error) {
      console.error(`Error for profile ${girl.id}:`, error.message);
    } else {
      console.log(`Added comments for profile ${girl.id}`);
    }
  }
  console.log('Done!');
}

addFakeComments();
