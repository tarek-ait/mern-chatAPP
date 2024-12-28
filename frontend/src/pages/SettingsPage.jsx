import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constans/index.js"
import { Send } from 'lucide-react'


const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: 'Hello there!',
    isSent: false,
  },
  {
    id: 2,
    content: 'Haloo! mar!',
    isSent: true,
  }
]


const SettingsPage = () => {

  const { theme, setTheme } = useThemeStore()

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"} `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>

              <span className="text-{11px} font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>

          ))}
        </div>

        {/* the preview section */}
        <h3 className="text-lg py-11  font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-10 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* moc chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* chat header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      M
                    </div>
                    <div className="font-medium text-sm">
                      <h3 className="font-medium text-base-content/70">Mar!</h3>
                      <p>Online</p>
                    </div>
                  </div>
                </div>
                {/* chat messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((msg) => (
                    <div key={msg.id}
                      className={`flex gap-2 ${msg.isSent ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm 
                    ${msg.isSent ? "bg-primary text-primary-content/70" : "bg-base-200"}
                    `}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                        className={`text-[10px] mt-1.5
                        ${msg.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>12:00</p>
                      </div>
                      
                    </div>
                  ))}
                </div>
                {/* chat input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-5 py-3 rounded-xl bg-base-200"
                      value="this is a preview"
                      readOnly
                    />
                    <button
                      className="btn btn-primary h-10 min-h-0"
                    >
                      <Send className="m-1" size={18}></Send>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
  )
}

export default SettingsPage
